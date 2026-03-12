import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router as healthRouter } from "./routes/health";
import { router as clinicsRouter } from "./routes/clinics";
import { router as authRouter, initializeAdmin } from "./routes/auth";
import { router as reviewsRouter } from "./routes/reviews";
import { router as blogRouter } from "./routes/blog";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/health", healthRouter);
app.use("/api/clinics", clinicsRouter);
app.use("/api/auth", authRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/blog", blogRouter);

app.get("/", (_req, res) => {
  res.json({
    name: "neulsw API",
    status: "ok"
  });
});

// 서버 시작 시 관리자 계정 초기화
initializeAdmin().then(() => {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
});





