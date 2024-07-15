import { serve, ServerType } from "@hono/node-server";
import { Hono } from "hono";
import { WebSocketServer } from 'ws';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());
const app = new Hono();

// Assuming serve returns a ServerType
const server: ServerType = serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}`);
});

// Create WebSocket server using the server instance
const wss = new WebSocketServer({ server: server as any });

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
      if (!id || !type || value === undefined) {
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
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === ws.OPEN) {
          console.log(`Broadcasting to client: ${client}`);
          client.send(JSON.stringify(message));
        } else {
          console.log(`Client not ready or the same client: ${client}`);
        }
      });

    } catch (error) {
      console.error('Failed to process message or update database', error);
    }
  });

  // ws.send("Connection done");
});
  