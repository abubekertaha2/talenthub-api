import express from 'express';
import 'dotenv/config'; 
import authRoutes from './routes/authRoutes.js'; 
import jobsRoutes from './routes/jobsRoutes.js'; 
import applicationsRoutes from './routes/applicationsRoutes.js';

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Main route (for testing)
app.get('/', (req, res) => {
  res.send('TalentHub API is running!');
});

// Link the authentication routes
app.use('/auth', authRoutes);

// Link the jobs routes
app.use('/jobs', jobsRoutes);

// Link the applications routes
app.use('/applications', applicationsRoutes); 

// Define the port from the environment variables or default to 5000 for localhost
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});