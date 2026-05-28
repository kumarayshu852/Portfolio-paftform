const express =require('express');
const cors=require('cors');
const dotenv = require('dotenv');
const connectDB=require('./config/db');

dotenv.config();

const app =express();

// middleware
app.use(cors({
  origin: "https://portfolio-paftform.vercel.app", // Yahan apna Vercel wala link dalo
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Database connect
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/profile',require('./routes/profileRoutes'));

// Test route
app.get('/', (req, res) => {
  res.send('Server chal raha hai!');
});

const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`server port is running on ${PORT} `)
});

