import pool from '../config/db.js';

/**
 * Finds a user by their email address.
 * @param {string} email
 * @returns {Promise<object|null>} The user object or null if not found.
 */
export const findByEmail = async (email) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw new Error('Database error while finding user.');
  }
};

/**
 * Creates a new user in the database.
 * @param {object} userData
 * @returns {Promise<number>} The ID of the newly created user.
 */
export const createUser = async ({ name, email, password, role }) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating new user:', error);
    throw new Error('Database error while creating user.');
  }
};

/**
 * Deletes a user from the database by ID.
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise<number>} The number of affected rows.
 */
export const deleteUserById = async (userId) => {
    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        throw new Error('Database error while deleting user.');
    }
};