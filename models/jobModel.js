import pool from '../config/db.js';

/**
 * Creates a new job posting in the database.
 * @param {object} jobData
 * @returns {Promise<number>} The ID of the newly created job.
 */
export const createJob = async ({ title, description, createdBy }) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO jobs (title, description, createdBy) VALUES (?, ?, ?)',
      [title, description, createdBy]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating job:', error);
    throw new Error('Database error while creating job.');
  }
};

/**
 * Finds all jobs.
 * @returns {Promise<object[]>} An array of job objects.
 */
export const findAllJobs = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs');
    return rows;
  } catch (error) {
    console.error('Error finding all jobs:', error);
    throw new Error('Database error while finding jobs.');
  }
};

/**
 * Finds a single job by its ID.
 * @param {number} jobId
 * @returns {Promise<object|null>} The job object or null if not found.
 */
export const findJobById = async (jobId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [jobId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error finding job by ID:', error);
    throw new Error('Database error while finding job.');
  }
};

/**
 * Deletes a job by its ID.
 * @param {number} jobId
 * @returns {Promise<number>} The number of affected rows (example 1 for success, 0 for failure).
 */
export const deleteJob = async (jobId) => {
  try {
    const [result] = await pool.query('DELETE FROM jobs WHERE id = ?', [jobId]);
    return result.affectedRows;
  } catch (error) {
    console.error('Error deleting job:', error);
    throw new Error('Database error while deleting job.');
  }
};