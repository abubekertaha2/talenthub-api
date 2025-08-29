# TalentHub API

### Project Description
This is the backend for a mini job portal application. The API allows employers to post jobs, applicants to apply for jobs, and an admin to manage users and applications.

### Key Features
- **User Authentication:** Secure registration and login with JWT.
- **Role-Based Access:** Separate permissions for Admin, Employer, and Applicant.
- **Job Management:** CRUD operations for job postings.
- **Application System:** Functionality for users to apply for jobs and for employers/admins to manage applications.

### Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/abubekertaha2/talenthub-api](https://github.com/abubekertaha2/talenthub-api)
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Database Configuration for Local Development:**
    * Create a MySQL database on your local machine.
    * Create a `.env` file in the root of the project.
    * Add your local database connection details to the `.env` file:
        ```env
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=user_local_db_password
        DB_DATABASE=talenthub_db
        DB_PORT=3306
        JWT_SECRET=long_random_string_for_local_use
        ```

4.  **Run the application:**
    ```bash
    npm start
    ```
    The server should start on `http://localhost:5000`.

---

### Deployment

#### **For Production (e.g., on Render)**

For a live deployment, you will need to create a production database and add its credentials as environment variables on your hosting service (like Render).

* **Render Environment Variables:**
    ```env
    DB_HOST=user_live_db_host
    DB_USER=user_live_db_user
    DB_PASSWORD=_live_db_password
    DB_DATABASE=user_live_db_name
    DB_PORT=your_live_db_port
    JWT_SECRET=a_long_random_string
    ```

### API Endpoints

You can view the full API documentation, including request examples and schemas, by following this link:

**[Paste your public Postman documentation link here]**

### Technologies Used
- Node.js
- Express.js
- MySQL2
- JWT
- bcrypt
- Postman for test api

### Deployed Application

The live API is deployed on Render and is accessible at this URL:

- **API Base URL:** https://talenthub-api-qzkj.onrender.com

All API endpoints can be accessed relative to this URL.