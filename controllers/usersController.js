import pool from '../config/db.js';
import { deleteUserById } from '../models/userModel.js'; 

/**
 * Handles getting all users. (Admin only)
 */
export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email, role FROM users');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/**
 * Handles deleting a user by their ID. (Admin only)
 */
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    
    // Safety check: Prevent Admin from deleting their own account
    if (req.user.role === 'Admin' && req.user.id === Number(id)) {
        return res.status(403).json({ message: 'Cannot delete your own Admin account.' });
    }

    try {
        const affectedRows = await deleteUserById(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};