# 🛍️ ShopEasy - MERN E-Commerce Website

ShopEasy is a full-stack e-commerce website built with the **MERN stack**. It provides a shopping experience with product browsing, customer authentication, cart management, checkout, Razorpay test payments, order tracking, and an admin dashboard.

## 🚀 Features

### 👤 Customer Features

* Firebase Login & Signup
* Browse products by categories
* Product search and filtering
* Product details page
* Add products to cart
* Increase/decrease product quantity
* Customer-specific cart
* Checkout and delivery details
* Razorpay test-mode payment
* Order success page
* Customer-specific My Orders
* Order status tracking
* Contact page
* Responsive design

### 🔐 Admin Features

* Admin Login
* Admin Dashboard
* Product management
* Add products
* Edit products
* Delete products
* View all customer orders
* Update order status
* Dashboard statistics

  * Total Products
  * Total Orders
  * Total Customers
  * Total Revenue

## 🛠️ Technologies Used

### Frontend

* React.js
* React Router
* Tailwind CSS
* JavaScript
* Vite
* Firebase Authentication

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Payment

* Razorpay Test Mode

### Tools

* Git
* GitHub
* VS Code
* Vercel

## 📁 Project Structure

```text
ShopEasy/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── data/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ShopEasy-E-Commerce.git
```

```bash
cd ShopEasy-E-Commerce
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
MONGO_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Create a `.env` file inside the `frontend` folder.

Example:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

**Never upload your `.env` files or secret keys to GitHub.**

## ▶️ Run the Project

### Start Backend

```bash
cd backend
npm start
```

Backend runs on:

```text
https://shop-easy-snowy-seven.vercel.app
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## 💳 Payment

ShopEasy uses **Razorpay Test Mode** for payment processing.

No real payment is made during testing.

## 🗄️ Database

The application uses **MongoDB Atlas** to store:

* Products
* Customer orders
* Customer information
* Payment information
* Order status

## 🔐 Authentication

Customer authentication is handled using **Firebase Authentication**.

Customers can:

* Create an account
* Login
* Logout
* Access their own cart
* View their own orders

## 📱 Responsive Design

ShopEasy is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

## 🎯 Project Purpose

This project was created as a full-stack MERN e-commerce application to practice and demonstrate:

* Frontend development
* Backend API development
* Database integration
* Authentication
* Payment integration
* REST APIs
* Admin dashboard development
* Responsive UI development

## 👩‍💻 Developer

**Vinitha Sebastin**

MSc Computer Science
Full-Stack MERN Developer

## 📄 License

This project is created for educational and portfolio purposes.

````

### Important

When creating the GitHub repository, **you can keep your local `README.md`**.

So when GitHub asks:

> Add a README file?

Choose **NO**.

Because you are going to push the README we just created from your computer.

Your process is now:

```text
Create README.md
       ↓
Create .gitignore
       ↓
git init
       ↓
git add .
       ↓
git commit
       ↓
Create empty GitHub repository
       ↓
git push
       ↓
GitHub ✅
       ↓
Vercel deployment 🚀