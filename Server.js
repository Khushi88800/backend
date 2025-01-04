import { config } from "dotenv";
import express from "express";
import databaseconnect from "./config/db.js";
import router from "./router/user.router.js";
import employeeRouter from './router/employee.route.js'
import documetRoutes from './router/documentation.route.js'
import salaryRoutes from './router/salary.route.js'
import miscRoutes from './router/miscellaneous.routes.js'
import leaveRoutes from './router/leaveApplication.route.js'
import payrollRoutes from './router/payroll.route.js'
import companyRoutes from './router/company.route.js'
import eventRoute from "./router/calender.event.routes.js"
import attendenceRoute from './router/attendence.route.js'
import morgan from "morgan";
import cors from "cors"
import cookieParser from "cookie-parser";
import { v2 } from 'cloudinary'

config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'))
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    })
);

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/v1/user", router);
app.use("/api/v1/documents",documetRoutes)
app.use("/api/employees",employeeRouter);
app.use('/api/v1/salary', salaryRoutes);
app.use('/api/v1', miscRoutes);
app.use('/api/v1/payroll',payrollRoutes)
app.use('/api/v1/leave', leaveRoutes)
app.use('/api/v1/company', companyRoutes);
app.use("/api/v1/events", eventRoute)
app.use("/api/v1/attendence",attendenceRoute)
const PORT = process.env.PORT || 8080;
app.get('/ping', (_req, res) => {
    res.send('Pong')
})
app.all('*', (_req, res) => {
    res.status(404).send('OOPS!!! 404 Page Not Found ');
});

app.listen(5000, '0.0.0.0', () => {
     await databaseconnect();
  console.log('Server is running on http://0.0.0.0:5000');
});

// app.listen(PORT, async () => {
//     console.log(`app is running ar http://localhost:${PORT}`)
// })
