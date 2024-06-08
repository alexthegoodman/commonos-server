import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";

import { server } from "./server";
import { context } from "./context";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { createServer } from "http";
import { fullDomainPort } from "./helpers/urls";
import { stripeHandler } from "./rest/stripeHandler";
import { snsIncomingEmailHandler } from "./rest/snsIncomingEmailHandler";
import WebSocket from "ws";

const prisma = new PrismaClient();

export const startApolloServer = async () => {
  await server.start();

  const app = express();

  // server.applyMiddleware({ app });
  // https://www.apollographql.com/docs/apollo-server/api/express-middleware/#context
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json({ limit: "50mb" }),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const tokenHeaderKey = process.env.TOKEN_HEADER_KEY as string;
        const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
        let currentUser;

        try {
          const tokenHeader = req.header(tokenHeaderKey);
          const token = tokenHeader?.split("Bearer ")[1] as string;

          // console.info("verify", token, jwtSecretKey);

          const verified = jwt.verify(token, jwtSecretKey);

          if (verified && typeof verified !== "string") {
            currentUser = await prisma.user.findFirst({
              where: {
                id: verified.userId,
              },
            });

            // console.info(
            //   "Verified Token",
            //   verified,
            //   "currentUser",
            //   currentUser
            // );
          } else {
            console.warn("Token Not Verified 1");
          }
        } catch (error: any) {
          // ex. if token is not provided
          console.warn("Token Not Verified 2", error);
          if (error.message === "jwt expired") {
            throw Error("JWT EXPIRED");
          } else if (error.message === "jwt malformed") {
            throw Error("JWT MALFORMED");
          }
        }

        return { req, currentUser, ...context };
      },
    })
  );

  // app.use("/webhook", bodyParser.raw({ type: "application/json" }));

  app.post(
    "/webhook",
    bodyParser.raw({ type: "application/json" }),
    stripeHandler
  );

  app.post(
    "/sns-incoming-email",
    bodyParser.raw({ type: "application/json" }),
    snsIncomingEmailHandler
  );

  const httpServer = createServer(app);
  // const io = new Server(httpServer, {
  //   cors: {
  //     origin: fullDomainPort,
  //   },
  // });

  // io.on("connection", (socket) => {
  //   console.info("a user connected");
  // });

  // Event handlers
  const eventHandlers = {
    eventName1: handleEventName1,
    eventName2: handleEventName2,
    // Add more handlers here
  };

  function handleEventName1(currentUser, data, ws) {
    // Handle eventName1
    ws.send(JSON.stringify({ message: "Handled eventName1" }));
  }

  function handleEventName2(currentUser, data, ws) {
    // Handle eventName2
    ws.send(JSON.stringify({ message: "Handled eventName2" }));
  }

  const wss = new WebSocket.Server({ server: httpServer });

  // WebSocket connection and authentication
  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      const tokenHeaderKey = process.env.TOKEN_HEADER_KEY as string;
      const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

      const data = JSON.parse(message); // includes event, Authorization, and payload

      // console.info(
      //   "DEBUG incoming websocket message",
      //   data.event,
      //   data[tokenHeaderKey]
      // );

      // Check for auth token in the event
      if (data[tokenHeaderKey]) {
        try {
          const tokenHeader = data[tokenHeaderKey];
          const token = tokenHeader?.split("Bearer ")[1] as string;

          // console.info("verify", token, jwtSecretKey);

          const verified = jwt.verify(token, jwtSecretKey);

          if (verified && typeof verified !== "string") {
            let currentUser = await prisma.user.findFirst({
              where: {
                id: verified.userId,
              },
            });

            // Token is valid, route the event
            if (data.event && eventHandlers[data.event]) {
              eventHandlers[data.event](currentUser, data.payload, ws);
            } else {
              ws.send(JSON.stringify({ error: "Unknown event" }));
            }
          } else {
            ws.send(JSON.stringify({ warning: "Token Not Verified 1" }));
          }
        } catch (err) {
          // Token is invalid
          ws.send(JSON.stringify({ error: "Invalid token" }));
        }
      } else {
        // No token provided
        ws.send(JSON.stringify({ error: "No token provided" }));
      }
    });
  });

  await new Promise<void>((r) =>
    httpServer.listen({ port: process.env.PORT ? process.env.PORT : 4000 }, r)
  );

  console.info(`🚀 Server ready at http://localhost:4000/graphql`);
};

startApolloServer();
