let { app } = require("./index");

// Start server
app.listen(3000, () => {
  console.log(`Server running at http://localhost:${3000}`);
});
