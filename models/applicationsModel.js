import pool from '../config/db.js';

/**
 * Creates a new job application.
 * @param {object} applicationData
 * @returns {Promise<number>} The ID of the new application.
 */
export const createApplication = async ({ userId, jobId, resumePath }) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO applications (userId, jobId, resumePath) VALUES (?, ?, ?)',
      [userId, jobId, resumePath]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating application:', error);
    throw new Error('Database error while creating application.');
  }
};

/**
 * Finds all applications for a specific user (Applicant's view).
 * @param {number} userId
 * @returns {Promise<object[]>} An array of application objects.
 */
export const findApplicationsByUser = async (userId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM applications WHERE userId = ?', [userId]);
    return rows;
  } catch (error) {
    console.error('Error finding applications by user:', error);
    throw new Error('Database error while finding applications by user.');
  }
};

/**
 * Finds all applications for a specific job (Employer's view).
 * @param {number} jobId
 * @returns {Promise<object[]>} An array of application objects.
 */
export const findApplicationsByJob = async (jobId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM applications WHERE jobId = ?', [jobId]);
    return rows;
  } catch (error) {
    console.error('Error finding applications by job:', error);
    throw new Error('Database error while finding applications by job.');
  }
};

/**
 * Updates the status of a job application.
 * @param {number} id - The application ID.
 * @param {string} status - The new status ('shortlisted' or 'rejected').
 * @returns {Promise<number>} The number of affected rows.
 */
export const updateApplicationStatus = async (id, status) => {
  try {
    const [result] = await pool.query('UPDATE applications SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw new Error('Database error while updating application status.');
  }
};

/**
 * Finds a single application by its ID.
 * @param {number} applicationId
 * @returns {Promise<object|null>} The application object or null if not found.
 */
export const findApplicationById = async (applicationId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM applications WHERE id = ?', [applicationId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error finding application by ID:', error);
    throw new Error('Database error while finding application by ID.');
  }
};

/**
 * Checks for a pre-existing application by a user for a specific job.
 * @param {number} userId
 * @param {number} jobId
 * @returns {Promise<object|null>} The application object or null if not found.
 */
export const findExistingApplication = async (userId, jobId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM applications WHERE userId = ? AND jobId = ?', [userId, jobId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error finding existing application:', error);
    throw new Error('Database error while checking for existing application.');
  }
};