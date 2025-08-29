import { Router } from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { createJobPosting, getAllJobs, getJobById, deleteJobPosting, updateJob} from '../controllers/jobsController.js';

const router = Router();

// @route   POST /jobs
// @desc    Create a job (Employer only)
// @access  Private
router.post('/', protect, authorize('Employer'), createJobPosting);

// @route   GET /jobs
// @desc    List all jobs
// @access  Public
router.get('/', getAllJobs);

// @route   GET /jobs/:id
// @desc    View a single job
// @access  Public
router.get('/:id', getJobById);

// @route   PATCH /jobs/:id
// @desc    Employer updates their own job
// @access  Private
router.patch('/:id', protect, authorize('Employer'), updateJob);

// @route   DELETE /jobs/:id
// @desc    Employer deletes their own job
// @access  Private
router.delete('/:id', protect, authorize('Employer'), deleteJobPosting);

export default router;