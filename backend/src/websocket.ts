import { serve, ServerType } from "@hono/node-server";
import { Hono } from "hono";
import { WebSocketServer } from 'ws';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());
const app = new Hono();

// Debounce function
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Assuming serve returns a ServerType
const server: ServerType = serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});

// Create WebSocket server using the server instance
const wss = new WebSocketServer({ server: server as any });

interface ChangeLogEntry {
  author: string;
  line: number;
  text: string;
  timestamp: string;
}

let changesLog: ChangeLogEntry[] = [];

const logChange = debounce(async (id: string, type: string, value: string) => {
  try {
    await prisma.changeLog.create({
      data: {
        postId: id,
        author: "author",
        line: 0,
        text: value,
        timestamp: new Date(),
      },
    });
    console.log("Change log entry created successfully");
  } catch (error) {
    console.error('Failed to create change log entry', error);
  }
}, 10000); // 10 seconds debounce

wss.on("connection", function connection(ws) {
  console.log("Client connected");

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("message", async (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log("Received message:", message);

      const { id, type, value } = message;

      // Validate message fields
      if (!id || !type || value === undefined ) {
        console.error("Invalid message format:", message);
        return;
      }

      console.log("Updating post with id:", id);
      console.log("Field to update:", type);
      console.log("New value:", value);

      // Update the relevant field in the database
      const updatedPost = await prisma.realTimePost.update({
        where: { id: id },
        data: { [type]: value },
      });

      console.log("Post updated successfully:", updatedPost);

      // Broadcast the updated data to all connected clients
      const broadcastMessage = JSON.stringify(message);
      const broadcastPromises: Promise<void>[] = [];
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN && client !== ws) {
          broadcastPromises.push(new Promise<void>((resolve, reject) => {
            client.send(broadcastMessage, (err) => {
              if (err) {
                console.error('Failed to send message:', err);
                reject(err);
              } else {
                resolve();
              }
            });
          }));
        }
      });

      try {
        await Promise.all(broadcastPromises);
        console.log('Broadcast completed successfully');
      } catch (error) {
        console.error('Error during broadcasting:', error);
      }

      // Log the change with debounce
      logChange(id, type, value);

    } catch (error) {
      console.error('Failed to process message or update database', error);
    }
  });
});

app.get('/changes-log', (c) => {
  return c.json(changesLog);
});
