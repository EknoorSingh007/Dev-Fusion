# DevFusion: The Academic Collaboration Hub

> DevFusion connects students from various colleges to collaborate on innovative tech projects. It’s the perfect place to build a team, showcase your skills, and bring new ideas to life.


*(You can add a screenshot of your new homepage here!)*

## What is DevFusion?

Welcome to DevFusion! This is a full-stack web application built to be the central hub for student collaboration. Whether you have a brilliant idea for a new app or you're looking to join an exciting project, DevFusion provides the tools to connect, create, and build.

This project includes a powerful React frontend and a secure Django (Python) backend, all working together to manage users, profiles, and projects.

## What Can You Do?

As a user, you can:

* **Discover Projects:** Land on a beautiful homepage that showcases featured projects from top universities (like IITs and NITs) and highlights trending technologies.
* **Sign Up & Log In:** Create a secure account and log in with a fully-functional authentication system. Your session is managed globally using Redux.
* **Create Your Profile:** Once logged in, you can visit your **Student Profile Hub** to build your personal brand.
* **Edit Your Profile:** Click "Edit Profile" to add and save your bio, title, university, and social media links (like GitHub and LinkedIn) directly to the database.
* **Launch Your Ideas:** Go to the **Project Creation Studio**, a multi-step form to build and publish your own project. You can:
    * Start from scratch or use pre-built templates (e.g., "Web App," "AI/ML Project").
    * Define your project's title, description, and cover image.
    * Specify the team size, skills, and technologies required.
    * Set up collaboration rules, like what communication tools you'll use.
    * Preview your project and publish it.
* **Showcase Your Work:** Any project you create is automatically fetched from the backend and displayed on your public profile in the **Project Portfolio** section.
* **Manage Your Workspace:** Visit the **Collaboration Workspace** to see your active project. This dashboard shows your team members, tasks, and project overview. (If you have no projects, it will prompt you to create one!)
* **Log Out:** Securely end your session and protect your account.

---

## Tech Stack

This project is built with a modern, full-stack architecture.

* **Frontend (Client):**
    * **React** (with Vite)
    * **React Router v6** (for page navigation)
    * **Redux Toolkit** (for global state management)
    * **Tailwind CSS** (for all styling and the custom theme)
    * **Axios** (for communicating with the backend API)
    * **React Hook Form** (for secure and validated forms)

* **Backend (Server):**
    * **Django** & **Django Rest Framework (DRF)**
    * **SimpleJWT** (for token-based authentication)
    * **Python**
    * **SQLite3** (for the database)

---

## How to Run This Project

To get DevFusion running locally, you need to start both the backend server and the frontend server.

### 1. Backend Setup (Django)

Your backend runs on `http://127.0.0.1:8000`.

```bash
# 1. Go to the backend folder
cd devfusion_backend

# 2. Activate your virtual environment
# On Windows (Git Bash)
source venv/Scripts/activate
# On macOS/Linux
source venv/bin/activate

# 3. Install all packages
pip install -r requirements.txt

# 4. Run your database migrations
# (You only need to do this once or when models change)
python manage.py makemigrations
python manage.py migrate

# 5. Create your admin account (if you haven't)
python manage.py createsuperuser

# 6. Start the server!
python manage.py runserver