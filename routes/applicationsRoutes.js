import { Router } from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { createNewApplication, getMyApplications, getJobApplications, updateApplication } from '../controllers/applicationsController.js';

const router = Router();

// @route   POST /applications
// @desc    Applicant applies for a job
// @access  Private (Applicant only)
router.post('/', protect, authorize('Applicant'), createNewApplication);

// @route   GET /applications
// @desc    Applicant gets their applications
// @access  Private (Applicant only)
router.get('/', protect, authorize('Applicant'), getMyApplications);

// @route   GET /applications/job/:jobId
// @desc    Employer gets all applications for one of their jobs
// @access  Private (Employer/Admin only)
router.get('/job/:jobId', protect, authorize('Employer', 'Admin'), getJobApplications);

// @route   PATCH /applications/:id
// @desc    Employer/Admin updates application status
// @access  Private (Employer/Admin only)
router.patch('/:id', protect, authorize('Employer', 'Admin'), updateApplication);

export default router;