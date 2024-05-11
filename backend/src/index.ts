import { Hono } from 'hono'
import {userRouter} from "./routes/user"
import {blogRouter} from "./routes/blog"
import { cors } from 'hono/cors'


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();


app.use('/*',cors());
app.route("/api/vi/user",userRouter);
app.route("/api/vi/blog",blogRouter);






export default app
