import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Define a route for '/home' to serve 'home.html'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});
app.get("/cause", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cause.html"));
});
app.get("/transactions", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "transaction.html"));
});
app.get("/terms", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "terms.html"));
});
app.get("/request_donation", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "donation.html"));
});
app.get("/cause-details", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cause-details.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});
app.get("/donate", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "donation.html"));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
