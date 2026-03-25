# 🌿 Ecobazar - Fresh Organic Food E-commerce 

![Thumbnail](https://github.com/user-attachments/assets/e83fc734-b1fe-459c-a4e3-f33e9f90ec9f)

<div align="center">

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
  ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
  ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

  <p align="center">
    <a href="#">View Demo</a>
  </p>
</div>

## 📖 Overview
**Ecobazar** is a full-featured e-commerce web application designed to provide users with a simple and fast interface for purchasing organic fruits and vegetables. The project is built using a **Modular** architecture to ensure easy maintenance and future development.

## ✨ Key Features
* 🔐 **Secure Authentication:** User login system with full protection.  
* 🛒 **Smart Shopping Cart:** Manage cart items with real-time price updates and synchronization with Local Storage.  
* 🔍 **Filtering:** Advanced search and filtering system by categories and price.  
* 📱 **Fully Responsive:** User interface fully responsive across all screen sizes.  
* 🚀 **Performance Optimized:** Fast API request handling to ensure the best user experience.


## 🛠 Tech Stack

### Frontend
- **React.js** (Functional Components, Hooks)
- **Context API** (State Management)
- **Bootstrap** (UI Framework & Layouts)
- **Axios** (Data Fetching)

### Backend & Database
- **Node.js & Express** (Restful API Design)
- **MySQL**

## 📁 Project Structure

```plaintext
Ecobazar/
│
├── back-end/               # Node.js server files
│   ├── node_modules/       # Installed Node.js packages
│   ├── uploads/            # Uploaded files storage
│   ├── Server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── package-lock.json   # Backend dependency lock file
│
├── front-end/              # React client files
│   ├── public/             # Static files (images, favicon, etc.)
│   │   └── index.html
│   ├── src/                # React source files
│   │   └── (components, pages, layouts, assets...)
│   ├── package.json        # Frontend dependencies
│   ├── package-lock.json   # Frontend dependency lock file
│   ├── vite.config.js      # Vite configuration
│   ├── eslint.config.js    # ESLint configuration
│   └── README.md           # Frontend README
│
├── .gitignore              # Git ignore rules
└── README.md               # Main project README
```
## 🛡️ Challenges & Solutions
| Challenge | Solution |
| :--- | :--- |
| **State Persistence** | Using `localStorage` with React Hooks to keep cart data synchronized even after page reloads. |
| **Responsiveness** | Implementing Bootstrap's Grid system along with custom media queries to ensure perfect mobile display. |
| **API Security** | Implementing middleware to verify tokens and encrypt sensitive data between the client and server. |


## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Database (MySQL) running

