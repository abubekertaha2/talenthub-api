import { createApplication, findApplicationsByUser, findApplicationsByJob, updateApplicationStatus, findApplicationById, findExistingApplication } from '../models/applicationsModel.js';
import { findJobById } from '../models/jobModel.js'; 

/**
 * Handles creating a new job application. (Applicant only)
 */
export const createNewApplication = async (req, res) => {
  const { jobId, resumePath } = req.body;
  const userId = req.user.id; 

  try {
    // Check if a job with the provided ID exists
    const job = await findJobById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    // Check for a duplicate application
    const existingApplication = await findExistingApplication(userId, jobId);
    if (existingApplication) {
      return res.status(409).json({ message: 'You have already applied for this job.' });
    }

    const newApplicationId = await createApplication({ userId, jobId, resumePath });
    res.status(201).json({ message: 'Application submitted successfully!', applicationId: newApplicationId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Handles getting all applications for a specific user. (Applicant's view)
 */
export const getMyApplications = async (req, res) => {
  const userId = req.user.id; 

  try {
    const applications = await findApplicationsByUser(userId);
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Handles getting all applications for a specific job. (Employer's view)
 */
export const getJobApplications = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user.id; 

  try {
    const job = await findJobById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    if (job.createdBy !== userId) {
      return res.status(403).json({ message: 'Not authorized to view these applications.' });
    }

    const applications = await findApplicationsByJob(jobId);
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Handles updating the status of a job application. (Employer/Admin only)
 */
export const updateApplication = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const application = await findApplicationById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    const job = await findJobById(application.jobId);

    if (job.createdBy !== userId && userRole !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized to update this application.' });
    }

    const affectedRows = await updateApplicationStatus(id, status);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    res.status(200).json({ message: 'Application status updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};