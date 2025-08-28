import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createJob, findAllJobs, findJobById, deleteJob } from '../models/jobModel.js';

/**
 * Handles creating a new job posting. (Employer only)
 */
export const createJobPosting = async (req, res) => {
  const { title, description } = req.body;
  const createdBy = req.user.id; // Get the user ID from the protected route

  try {
    const newJobId = await createJob({ title, description, createdBy });
    res.status(201).json({ message: 'Job created successfully!', jobId: newJobId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Handles getting all job postings.
 */
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await findAllJobs();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Handles getting a single job posting by ID.
 */
export const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await findJobById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Handles deleting a job posting by ID. (Employer only, must be the creator)
 */
export const deleteJobPosting = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await findJobById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    
    // Check if the authenticated user is the one who created the job
    if (job.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this job.' });
    }
    
    const affectedRows = await deleteJob(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    res.status(200).json({ message: 'Job deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};