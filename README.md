# Todo Application — Mini Project

## Assignment Overview

As professionals, we are constantly engaged in various tasks throughout the day and require an efficient way to manage them. One effective solution is a simple Todo Application built using Node.js. 

This app will help organize tasks that can exist in three states: **pending**, **completed**, or **deleted**. The application should include a user interface for task management, as well as user authentication so multiple users can manage their own tasks independently.

---

## Features

- User registration and login using username and password
- Create, update, and delete tasks
- Tasks can be marked as pending, completed, or deleted
- Tasks are only visible to the user who created them
- Sort/filter tasks by state (pending or completed)
- Global and local error handling
- Logging with a consistent format
- Clean and simple UI design (optional extra marks for implementing with EJS or any templating engine)
- Hosted on a live server (Pipeops, Render, etc.)
- Uses MongoDB as the database

---

## Requirements

- [ ] Build the frontend UI using EJS or any preferred templating engine (optional but recommended for extra marks)
- [x] Implement user authentication (username and password)
- [x] Ensure users can only view and manage their own tasks
- [x] Design an ER diagram showing relationships between `users` and `tasks`
- [x] Write automated tests where possible
- [x] Handle errors both globally and locally
- [x] Implement logging with a consistent format
- [x] Keep the UI simple and clean
- [x] Use MongoDB as the backend database
- [x] Host the application online

---

## ER Diagram

Use tools like [drawSQL](https://drawsql.app) to create and share your ER diagram. It should illustrate the relationship between the `User` and `Task` entities, including fields like task state, due date, and ownership.

## ER Design
https://www.figma.com/board/Dhr8AaRzzYWvN7JbEwwf7h/FigJam-ER-Diagram-Template--Community-?node-id=0-1&t=GixA975U6fve9apD-1

---

## Submission

**Submission Link:** TBD

Please ensure your application is live and accessible before submission. Include any necessary credentials for demo purposes.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS (or another view engine)
- CSS (for styling)
- Logging (e.g., Morgan or Winston)
- Testing (e.g., Jest, Supertest)
- Deployment (e.g., Render, Pipeops)

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Abiodun-Sabitu/Todooz-app
cd todo-app
npm install
