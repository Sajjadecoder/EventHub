import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js' 
const app = express();
const port = 3000;
import { pool } from './db/connectDB.js';
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',  // Frontend origin
    credentials: true,                // Needed if you're using cookies
  }));
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
//routes 

app.use('/api/auth',authRouter)




