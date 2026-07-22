const mg = require("express")

const app = mg()
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
