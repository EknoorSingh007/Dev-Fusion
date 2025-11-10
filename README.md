# DevFusion

DevFusion connects students from various colleges to collaborate on innovative tech projects. It’s the perfect place to build a team, showcase your skills, and bring new ideas to life.

This project is built in two parts: a **React website** (the "frontend") and a **Python/Django server** (the "backend") that manages all the data and user accounts.


## What Can You Do on DevFusion?

* **Discover Projects:** Browse an engaging homepage that shows featured projects from top universities, like IITs and NITs.
* **Sign Up & Log In:** Create your own secure account with a validated password (uppercase, number, and special character required).
* **Create Your Profile:** Visit your personal **Profile Hub** to build your portfolio.
* **Edit Your Profile:** Click the "Edit Profile" button to add and save your bio, title, university, and social links (like GitHub) directly to the database.
* **Launch Your Ideas:** Go to the **Project Creation Studio**, a multi-step form to build and publish your own project idea.
    * You can use pre-built templates (like "Web App" or "AI/ML Project") to get started.
    * A step-by-step form guides you through adding a title, description, image, and the skills you need.
    * When you click "Publish," your project is saved to the backend and linked to your account.
* **Showcase Your Work:** Any project you create automatically appears on your profile page in the "Project Portfolio" tab for other users to see.
* **Manage Your Workspace:** The **Collaboration Workspace** page will show your active project. This dashboard shows your team members, tasks, and project overview. (If you have no projects, it will prompt you to create one!)
* **Log Out:** Securely end your session and protect your account.

---

## Software You'll Need (Pre-requisites)

Before you start, make sure you have these tools installed on your computer:

1.  **Node.js**: This runs the React website and manages its packages.
    * *Download:* [https://nodejs.org/](https://nodejs.org/)
2.  **Python**: This runs the Django server.
    * *Download:* [https://www.python.org/downloads/](https://www.python.org/downloads/)

---

## How to Run This Project (Step-by-Step)

To run DevFusion, you must start **both** the backend server and the frontend website. You'll need to open **two separate terminals** for this.

### Part A: Start the Backend (Terminal 1)

The backend server runs on `http://127.0.0.1:8000`.

1.  **Open your first terminal** (Git Bash, PowerShell, CMD, etc.).
2.  **Navigate to the backend folder:**
    ```bash
    cd devfusion_backend
    ```
3.  **Activate the Python virtual environment:**
    ```bash
    # On Windows (Git Bash)
    source venv/Scripts/activate
    
    # On macOS/Linux
    source venv/bin/activate
    ```
4.  **(First Time Only) Install all packages:**
    ```bash
    pip install -r requirements.txt
    ```
5.  **(First Time Only) Set up your database:**
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
6.  **(First Time Only) Create your *Admin* account:**
    ```bash
    python manage.py createsuperuser
    ```
    (Follow the prompts to create your **admin** username and password. For example, use `admin` and a secure password).
7.  **Run the server:**
    ```bash
    python manage.py runserver
    ```
    Keep this terminal running.

### Part B: Start the Frontend (Terminal 2)

The frontend website runs on `http://localhost:4028`.

1.  **Open a new, second terminal.**
2.  **Navigate to the root project folder** (the `DevFusion` folder that contains `package.json`):
    ```bash
    cd DevFusion
    ```
3.  **(First Time Only) Install all packages:**
    ```bash
    npm install
    ```
4.  **Run the server:**
    ```bash
    npm run dev
    ```
    Keep this terminal running.

### Part C: Accounts & Testing

You can now open **`http://localhost:4028`** in your browser to use the app!

There are two ways to test the application:

1.  **Test as a Normal User (Recommended):**
    * Go to the **Sign Up** page (`/register`).
    * Create a test user account with these credentials:
    * **Username:** `eknoorsingh123`
    * **Email:** `eknoor@gmail.com` (or any email)
    * **Password:** `Eknoor#Singh#123`
    * You can now log in with this account to test all the user features (creating projects, editing your profile, etc.).

2.  **Test as an Admin:**
    * Go to the **Admin Panel** URL: `http://127.0.0.1:4028/admin/`
    * Log in with the **superuser** account you created in **Part A, Step 6**.
    * Here you can see all the raw data in the database (all users, projects, profiles, etc.).