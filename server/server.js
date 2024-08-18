const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();

app.use(
  fileUpload({
    limits: {
      fileSize: 1000000,
    },
    abortOnLimit: true,
  })
);

app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/user.routes.js"));
app.use("/api/post", require("./routes/post.routes.js"));
app.use("/api/auth", require("./routes/auth.routes.js"));
app.use("/api/answer", require("./routes/answer.routes.js"));
app.use("/api/category", require("./routes/category.routes.js"));

app.listen(5000, () => console.log("Running on " + 5000));
