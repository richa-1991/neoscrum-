const express = require("express");
// const os = require("os");
const path = require("path");
// const bodyParser = require("body-parser");
const userSeeder = require("./seeder/userSeeder");
const cookieParser = require("cookie-parser");
// My routes
const authRoutes = require("./src/routers/authRoute");
const adminRoutes = require("./src/routers/adminRoute");
const userRoutes = require("./src/routers/userRoute.js");

// for image file upload
const fileUpload = require("express-fileupload");

const app = express();

require("dotenv").config();
require("./db/conn");

const PORT = process.env.PORT || 4000;
app.use(express.static(path.join(__dirname, '/')))
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        createParentPath: true,
    })
);


// my routes
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
 app.use("/api", userRoutes);

app.listen(PORT, userSeeder);
