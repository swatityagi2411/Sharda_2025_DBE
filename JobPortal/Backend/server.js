const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://swatityagidgi:admin123@swaticluster.5axzawy.mongodb.net/Jobportal?retryWrites=true&w=majority&appName=SwatiCluster")
  .then(() => console.log(" Database connected"))
  .catch(err => console.log(err));

// Routes
app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoutes);

app.listen(5000, () => console.log(" Server running on http://localhost:5000"));
