import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';
import { realtimeblogRouter } from './routes/realTimeBlog';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
    webSocket: string,
  },
}>();

app.use(cors());
app.route('/api/vi/user', userRouter);
app.route('/api/vi/blog', blogRouter);
app.route('/api/vi/realtimeblog', realtimeblogRouter);


  

export default app;
