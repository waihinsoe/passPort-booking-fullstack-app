import express, { Request, Response } from "express";
import cors from "cors";
import availability from "./availability";
const app = express();
const port = 5000;

app.use(cors());

app.get("/availability", (req: Request, res: Response) => {
  const chosenMonth = req.query.month;

  const availability_for_chosen_month = availability.filter((item) => {
    return item.month === chosenMonth;
  });
  res.send({ availability: availability_for_chosen_month });
});

app.listen(port, () => {
  console.log("server is listening at port :", port);
});
