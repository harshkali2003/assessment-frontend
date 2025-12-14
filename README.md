🎨 Frontend – Sweet Shop Management System
📖 Project Overview

This is the frontend application for the Sweet Shop Management System, developed as part of a Software Developer Internship Assessment.

The frontend provides a clean and user-friendly interface for:

Customers to browse and purchase sweets

Admins to manage products and inventory

The application follows a single frontend with role-based UI rendering, instead of separate apps, to keep the system simple and efficient.

🚀 Tech Stack

React.js

React Router DOM

Axios

React Toastify

CSS (Mobile-first styling)

JWT-based auth handling

📂 Folder Structure
frontend/
│
├── components/          # Reusable UI components
├── pages/               # Page-level components
├── styles/              # CSS files
├── utils/               # Helper functions
├── App.js
├── index.js
└── README.md

🧑‍💻 Features
👤 User

Browse products

Search sweets

Purchase products

View stock availability

🛠 Admin

Add new products

Edit product details

Delete products

Increase / decrease stock

Admin-only controls visible based on role

🎯 Design Decisions

Single frontend for Admin & User

UI changes dynamically based on user role

Avoided unnecessary complexity of separate admin panel

Mobile-first approach

Clean, readable UI

Real-time updates after actions

🤖 AI Assistance Used (Transparent Disclosure)

AI tools (ChatGPT) were used as a development assistant, especially during planning and UI decisions.

Frontend AI Help Included:

✅ Folder structuring

Helped organize pages, components, and styles logically

✅ Architecture decisions

Guidance on whether to create a separate admin panel

Decided to keep a single frontend with role-based UI

✅ UI/UX assistance

Help with layout ideas

Improving responsiveness

Styling admin action buttons and forms

Improving user feedback with toasts

The final UI, component logic, and styling were implemented and customized manually.

▶️ How to Run Frontend
npm install
npm start


Make sure backend is running on:

http://localhost:5000

✅ Assessment Notes

This frontend focuses on:

Simplicity

Clear UX

Role-based rendering

Practical real-world patterns

🙌 Final Note

This project was built with learning, correctness, and clarity as priorities.
AI was used responsibly as a guide and debugging assistant, while all core understanding and implementation decisions were made independently.