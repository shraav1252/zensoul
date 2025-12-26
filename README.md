# ZenSoul — Privacy-First Journaling & Wellness Application

ZenSoul is a full-stack web application designed to provide a secure, calming space for journaling and emotional well-being. The application prioritizes **user privacy** by implementing **client-side encryption**, ensuring that sensitive journal content is never readable by the server.

The project demonstrates practical full-stack development skills along with real-world security considerations.

---

## Key Features

- Secure journaling with client-side AES encryption
- Create, edit, delete, and search journal entries
- Password-protected journal access
- Dark mode support
- Calming affirmations and wellness tools
- Anxiety guide and emergency contacts
- Responsive, minimal, and calming UI

---

## Privacy & Security Design

- Journal entries are encrypted in the browser before being sent to the backend
- MongoDB stores only encrypted journal content
- Decryption occurs locally using the user’s password
- The backend never has access to plaintext journal data
- Passwords are not transmitted or stored on the server

This design ensures strong privacy while maintaining usability.

---

## Technology Stack

### Frontend
- React
- Tailwind CSS
- Crypto-JS (AES encryption)
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose


---

## Running the Project Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB Atlas connection string

---

### Backend Setup

```bash
cd server
npm install
npm start

The backend server will run at:

http://localhost:5000

---

### Frontend Setup

cd ..
npm install
npm start

The frontend application will run at:

http://localhost:3000

API Overview

Base URL:

http://localhost:5000/api/journal


Supported operations:

- GET all journal entries

- GET journal entry by ID

- POST new journal entry

- PATCH update journal entry

- DELETE journal entry

- All journal content is encrypted before transmission.

### Purpose of the Project

ZenSoul was built to explore how modern web technologies can support mental health applications without compromising user privacy. The project focuses on:

- Secure data handling

- Clean UI/UX for emotional well-being

- Practical full-stack architecture

- Real-world encryption usage

- Future Enhancements

- User authentication with encrypted profiles

- Encrypted cloud backups

- Progressive Web App (PWA) support

- Privacy-preserving AI mood analysis

- Mobile-first optimization

### Author ###
Shraavya Mallaram
