import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import {errorMiddleware} from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public-api.js";
import { userRouter } from "../routes/auth-api.js";
import cookieParser from "cookie-parser";
import apiDocumentation from "../../docs/api-docs.json" assert { type: "json" };
import { adminRouter } from "../routes/admin-api.js";

const upload = multer(); 
dotenv.config();
export const web = express();

// SWAGGER
web.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));

web.use(cookieParser());
web.use(cors()); 
web.use(express.json());
web.use(upload.none());
web.use(publicRouter);
web.use(userRouter);
web.use(adminRouter);
web.use(errorMiddleware);
