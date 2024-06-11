const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectionDB = require('./database/connectionDB')
const cookieParser = require('cookie-parser')
const todosRoutes = require('./routes/todos')
const usersRoutes = require('./routes/users')
const topicsRoutes = require('./routes/topics')

const app = express();
dotenv.config();
app.use(
    cors({
        origin: [
            "http://localhost:3000",
        ],
        credentials: true,
    })
);
app.use(express.json());
connectionDB();
app.get("/", (req, res) => {
    res.json("Hello");
});
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/todos", todosRoutes);
app.use("/api/topics", topicsRoutes);
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server Is Running On Port ${PORT}`)
);