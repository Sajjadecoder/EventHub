import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js' 
import dotenv from 'dotenv'
import adminRouter from './routes/admin.routes.js' 
import userRouter from './routes/user.routes.js' 
import { pool } from './db/connectDB.js';
const app = express();
const port = process.env.PORT || 3000;
const frontendUrl= process.env.FRONTEND_URL
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: frontendUrl,  // Frontend origin
    credentials: true,                
  }));
app.listen(port, () => {
  console.log(`Server is running at ${process.env.BACKEND_URL}`);
});
//routes 

app.use('/api/auth',authRouter)
app.use('/api/admin',adminRouter)
app.use('/api/users',userRouter)




