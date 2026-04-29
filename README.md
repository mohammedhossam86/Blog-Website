# Node.js Blog Website 🚀

A full-stack, responsive, and dynamic blog website built with Node.js, Express, and MongoDB. The project features a clean MVC-inspired architecture, a public-facing blog with search functionality, and a secure Admin Dashboard for content management.

## 🔗 Live Demo
**[Check out the live website here](https://blog-website-qdg7sfda5-hossams-projects-179e97db.vercel.app/)** *(Replace with your final Vercel URL if different)*

## ✨ Features

### Public Facing (Users)
- View the latest blog posts with pagination.
- Read single posts in detail.
- Search functionality to find specific posts by keywords.
- "About" page for website information.

### Admin Dashboard
- **Authentication:** Secure Admin registration and login using `bcrypt` for password hashing and `JWT` (JSON Web Tokens) for session management (via cookies).
- **Content Management System (CMS):**
  - Create new blog posts.
  - Read/View all existing posts.
  - Update/Edit posts.
  - Delete posts safely.
- **Logout Functionality:** Securely clears cookies and ends the session.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose (ODM)
- **Frontend/Views:** EJS (Embedded JavaScript templating), HTML, CSS
- **Authentication & Security:** bcrypt, JSON Web Tokens (JWT)
- **Deployment:** Vercel

## 🚀 Local Development Setup

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/mohammedhossam86/Blog-Website.git](https://github.com/mohammedhossam86/Blog-Website.git)
cd Blog-Website
```
### 2. Install Dependencies
```bash
  npm install
```
### 3. Environment Variables

Create a .env file in the root directory of the project and add the following variables:
```bash
# Your MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/blog?retryWrites=true&w=majority

# Secret key for JWT Authentication
JWT_SECRET=your_super_secret_key_here

# Port number (Optional)
PORT=3000
```
### 5. Run the Server

Start the development server:
```bash
npm start
# OR if using nodemon
npm run dev
```
The application will be running on http://localhost:3000

## 📁 Project Structure highlights
- /models: Mongoose database schemas (Post, User).

- /controllers or /routes: Application logic and routing (mainRouter, adminRouter).

- /views: EJS templates separated into layouts, partials, admin pages, and public pages.

- app.js: Application entry point and middleware configuration.

## 👤 Author
Mohammed Hossam
