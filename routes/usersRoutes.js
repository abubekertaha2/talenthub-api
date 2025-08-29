import { Router } from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { getAllUsers, deleteUser } from '../controllers/usersController.js';

const router = Router();

// @route   GET /users
// @desc    Admin gets all users
// @access  Private (Admin only)
router.get('/', protect, authorize('Admin'), getAllUsers);

// @route   DELETE /users/:id
// @desc    Admin deletes a user
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('Admin'), deleteUser);

export default router;