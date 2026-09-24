import app from "./app.js";
import connectDb from "./shared/config/db.js";

await connectDb();
app.listen(3000, () => {
  console.log("Server started on port: 3000");
});
