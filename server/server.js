const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/user", require("./routes/user.routes.js"));
app.use("/api/post", require("./routes/post.routes.js"));
app.use("/api/auth", require("./routes/auth.routes.js"));
app.use("/api/answer", require("./routes/answer.routes.js"));

app.listen(5000, () => console.log("Running on " + 5000));
