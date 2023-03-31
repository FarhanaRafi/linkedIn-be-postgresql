import Express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { pgConnect } from "./db.js";
import {
  badRequestHandler,
  unauthorizedHandler,
  notfoundHandler,
  genericErrorHandler,
} from "./errorHandlers.js";
import usersRouter from "./users/index.js";
import experiencesRouter from "./experiences/index.js";
import postsRouter from "./posts/index.js";
import commentsRouter from "./comments/index.js";

const server = Express();
const port = process.env.PORT || 3010;

server.use(cors());
server.use(Express.json());

server.use("/users", usersRouter);
server.use("/users", experiencesRouter);
server.use("/posts", postsRouter);
server.use("/posts", commentsRouter);

server.use(badRequestHandler);
server.use(notfoundHandler);
server.use(unauthorizedHandler);
server.use(genericErrorHandler);

await pgConnect();

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is running on port ${port}`);
});
