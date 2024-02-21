const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const chalk = require("chalk");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const routes = require("./routes");

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// const corsOptions = {
//   origin: ["http://localhost:8000/", "http://localhost:8000"],
//   credentials: true,
//   optionsSuccessStatus: 200,
// };
app.use(cors());

app.use(cookieParser());
app.use(morgan("combined"));

app.use(routes);

mongoose.set("useCreateIndex", true);
mongoose
  .connect(
    "mongodb+srv://ecommerce:SCKkbggdWQ0MTqnO@cluster0.cvy0cni.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() =>
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`)
  )
  .then(() => {
    const PORT = process.env.PORT || 5001;

    http.listen(PORT, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "Server Started on port"
        )} ${chalk.bgMagenta.white(PORT)}`
      );
    });
  })
  .catch((err) => console.log(err));
