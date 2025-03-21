require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require('./router/auth-router');
const connectDatabase = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute = require("./router/contact-router");
const achievementRoute = require("./router/achievement-router");
const cors = require("cors");
const adminRoute = require("./router/admin-router");
const path = require("path");

const _dirname = path.resolve();

const corsOption = {
    origin: 'https://mithuninfo.vercel.app',
    methods: "GET, POST, PUT, DELETE, HEAD, PATCH",
    credentials: true,
};

app.use(cors(corsOption));


//Middleware
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", achievementRoute);
app.use("/api/admin", adminRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_, res) =>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.use(errorMiddleware);

connectDatabase().then(() =>{
const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`Health check server is running on port ${port}`);
    });
});
