import { Request, Response } from "express";
import app from "./app";
import connect from "./common/config/database";
import { handleErrors } from "./common/middlewares/error";
import { config } from "./common/config";
import { managerRouter } from "./routes/manager.route";
import { customerRouter } from "./routes/customer.route";
import { categoryRouter } from "./routes/category.route";
import { carRouter } from "./routes/car.route";

app.get("/health", (req: Request, res: Response): any => {
  return res.status(200).json({
    status: "status",
    message: "server is up and running",
    data: null,
  });
});

app.use("/auth/manager", managerRouter);
app.use("/auth/customer", customerRouter);
app.use("/auth/category", categoryRouter);
app.use("/auth/car", carRouter);

app.use(handleErrors);

app.use((req, res, _next) => {
  res.status(404).json({
    status: "error",
    message: "resource not found",
    path: req.url,
    method: req.method,
  });
});

const PORT = config.PORT || 3000;
app.listen(PORT, async () => {
  await connect();
  console.log(`Server running on port ${PORT}`);
});
