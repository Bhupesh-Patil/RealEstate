<h1 align="center">🏡 Real Estate MERN Platform</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
</p>

## 📝 Project Description

The **Real Estate MERN Platform** is a modern, full-stack web application designed to connect property buyers and sellers in a secure and intuitive environment. Built on the MERN stack (MongoDB, Express.js, React, Node.js), this platform solves the problem of decentralized and chaotic property hunting by offering a unified marketplace. 

**Main Objective**: To streamline property transactions by providing robust features like real-time chat, property approval workflows, advanced search filters, and dedicated dashboards for buyers, sellers, and administrators.

---

## 👀 Project Preview

| Landing Page | Property Details |
| :---: | :---: |
| ![Landing Page Placeholder](#) | ![Property Details Placeholder](#) |

| Buyer Dashboard | Seller Dashboard | Admin Dashboard |
| :---: | :---: | :---: |
| ![Buyer Dash Placeholder](#) | ![Seller Dash Placeholder](#) | ![Admin Dash Placeholder](#) |

| Login / Registration | Real-time Chat | Wishlist |
| :---: | :---: | :---: |
| ![Auth Placeholder](#) | ![Chat Placeholder](#) | ![Wishlist Placeholder](#) |

---

## ✨ Features

### 🛒 Buyer Features
- **Registration/Login**: Secure access with JWT and email verification.
- **Property Search & Advanced Filters**: Search by location, price range, property type, and more.
- **Sorting**: Sort properties by newest, price (low to high), etc.
- **Wishlist**: Save favorite properties to review later.
- **Property Details**: View comprehensive details including high-quality images and seller information.
- **Similar Properties**: AI-driven/category-driven suggestions for similar listings.
- **Chat with Seller**: Real-time Socket.io-powered messaging system.
- **Send Inquiry**: Direct inquiry forms sent straight to the seller's dashboard.
- **Profile Management**: Update personal details and avatars.
- **Contact Support**: Dedicated support channel via the Contact page.

### 🏠 Seller Features
- **Dashboard**: Centralized hub to manage all listings and leads.
- **Add Property**: Easy-to-use form with Cloudinary image upload integration.
- **Edit/Delete Property**: Full CRUD capabilities over owned listings.
- **Mark Property as Sold**: Status toggling to keep listings accurate.
- **Leads Management**: Track incoming buyer inquiries and interests.
- **Chat**: Communicate instantly with interested buyers.
- **Profile**: Manage seller profile and public contact information.

### 🛡️ Admin Features
- **Dashboard**: High-level overview of platform metrics.
- **User Management**: View, block, or delete users to maintain platform integrity.
- **Seller Approval**: Verify and approve new seller accounts.
- **Property Approval**: Review and approve/reject new property listings to ensure quality control.
- **Inquiry Management**: Monitor user inquiries and platform health.
- **System Monitoring**: Keep track of total sales, active users, and system alerts.

---

## 🛠️ Tech Stack

- **Frontend**: React (v19), Vite, Tailwind CSS (v4), React Router DOM, React Hot Toast, React Icons
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB & Mongoose ORM
- **Authentication**: JSON Web Tokens (JWT), bcryptjs
- **Media Storage**: Cloudinary, Multer (for multipart/form-data)
- **Emails**: Brevo (Sendinblue) API integration
- **Real-time**: Socket.io-client / Socket.io

---

## 🏗️ Architecture

The application follows a standard **MERN architecture**:
1. **Client (React)**: Handles the UI, state management, and routing. Makes RESTful HTTP requests via Axios to the backend. Real-time updates (like Chat) are established via WebSocket (Socket.io).
2. **Server (Express/Node)**: Acts as the API Gateway. Validates requests, authenticates users (JWT), and processes business logic (e.g., approving a property).
3. **Database (MongoDB)**: Cloud-hosted NoSQL database storing structured data models representing Users, Properties, Inquiries, etc.
4. **Cloud Services**: Cloudinary handles image hosting securely, while Brevo handles transactional emails (password reset, email verification).

---

## 📂 Folder Structure

```text
RealEstate/
├── frontend/
│   ├── public/              # Static public assets
│   ├── src/
│   │   ├── assets/          # Images and local assets
│   │   ├── components/      # Reusable UI elements (Navbar, PropertyCard, Sidebars)
│   │   ├── context/         # React Context (AuthContext, ChatContext)
│   │   ├── pages/           # Route views (admin/, auth/, buyer/, seller/, shared/)
│   │   ├── App.jsx          # Root component and router
│   │   ├── main.jsx         # React DOM entry
│   │   └── index.css        # Global styles (Tailwind)
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── config/              # MongoDB and Cloudinary config
    ├── controllers/         # Business logic for routes
    ├── middlewares/         # JWT Auth and Multer upload middlewares
    ├── models/              # Mongoose DB Schemas
    ├── routes/              # Express API route definitions
    ├── utils/               # Helpers (sendEmail, Cloudinary upload)
    ├── .env.example         # Environment template
    ├── package.json
    └── server.js            # Node entry point
```

---

## 🗄️ Database Collections

- **`users`**: Stores all user accounts (Buyers, Sellers, Admins) including hashed passwords and profile data.
- **`usertokens`**: Manages temporary tokens generated for email verification and password resets.
- **`properties`**: The core collection storing property listings, location details, Cloudinary image URLs, pricing, and approval status.
- **`chats`**: Manages real-time conversations and message history between specific buyers and sellers.
- **`inquiries`**: Stores structured questions/leads sent by buyers regarding specific properties.
- **`wishlists`**: Relational mapping of user IDs to saved property IDs.
- **`contacts`**: Stores generic site contact form submissions meant for the admin.

---

## 🌐 API Overview

| Module | Endpoint | Method | Description |
| :--- | :--- | :---: | :--- |
| **Auth** | `/api/auth/register` | `POST` | Register a new user |
| **Auth** | `/api/auth/login` | `POST` | Authenticate and receive JWT |
| **Users** | `/api/users/profile` | `GET` | Get logged-in user profile |
| **Properties** | `/api/properties` | `GET/POST` | Fetch all properties / Create new property |
| **Properties** | `/api/properties/:id`| `GET/PUT/DELETE`| Manage a specific property |
| **Admin** | `/api/admin/approve-property/:id`| `PUT` | Admin action to approve listings |
| **Inquiries** | `/api/inquiries` | `POST` | Submit an inquiry to a seller |
| **Wishlist** | `/api/wishlist` | `GET/POST` | Fetch or update user wishlist |
| **Chat** | `/api/chat/messages` | `GET/POST` | Retrieve or send chat messages |

---

## 🔐 Security

- **JWT Authentication**: Secure API access via stateless token authentication sent via headers.
- **Password Hashing**: User passwords are encrypted using `bcryptjs` before hitting the database.
- **Protected Routes**: Both frontend and backend utilize middleware to block unauthorized access to dashboards and sensitive APIs.
- **Role-Based Authorization**: Distinct access levels (Buyer, Seller, Admin) explicitly verified on critical endpoints.
- **Email Verification**: Prevents bot registrations and ensures secure password recovery.

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Bhupesh-Patil/RealEstate.git
cd RealEstate
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Configure your Environment Variables (see next section), then run:
```bash
npm run dev
```
*(Server will start on http://localhost:5000)*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*(Application will be running at http://localhost:5173)*

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory based on the provided `.env.example`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/realestate
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary Config
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_KEY=your_cloudinary_api_key
CLOUD_SECRET=your_cloudinary_api_secret

# Brevo (Email Service)
EMAIL_USER=your_verified_email_address
BREVO_API_KEY=your_brevo_api_key
```

---

## 🖼️ Screenshots

> **Note**: Add your local screenshots to a `/docs/images` folder and update the links below.

| Home Page | Property View |
| :---: | :---: |
| ![Home](https://via.placeholder.com/400x250?text=Home+Page) | ![Property](https://via.placeholder.com/400x250?text=Property+View) |

| Chat Interface | Admin Dashboard |
| :---: | :---: |
| ![Chat](https://via.placeholder.com/400x250?text=Chat+Interface) | ![Admin](https://via.placeholder.com/400x250?text=Admin+Dashboard) |

---

## 🌟 Future Enhancements

- **Payment Gateway Integration**: Allow sellers to pay for premium or featured property listings using Stripe.
- **Map-Based Search**: Integrate Google Maps or Mapbox API for visual property hunting.
- **Virtual Tours**: Add support for 360-degree images or embedded YouTube video walkthroughs.
- **Push Notifications**: Real-time browser notifications for incoming messages and property approvals.

---

## 📚 Learning Outcomes

By analyzing and building upon this project, the following concepts are demonstrated:
- Full-stack integration combining a modern React frontend with a scalable Node/Express backend.
- Real-time bidirectional event-based communication using **Socket.io**.
- Implementing robust **Role-Based Access Control (RBAC)** across the stack.
- Managing multipart form data and direct-to-cloud image uploads using **Cloudinary** and **Multer**.

---

## 👨‍💻 Author

**Bhupesh Patil**  
- GitHub: [@Bhupesh-Patil](https://github.com/Bhupesh-Patil)

## 📄 License

This project is licensed under the [MIT License](LICENSE).
