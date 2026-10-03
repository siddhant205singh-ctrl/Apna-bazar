🛒 Apna Bazar - Real-Time Kirana Store Application

Apna Bazar is a full-stack, real-time e-commerce platform built specifically for local Kirana (grocery) stores. Inspired by quick-commerce apps like Blinkit and Zepto, it features a dual-panel system allowing customers to seamlessly place orders while giving store owners a powerful dashboard to manage inventory and track orders in real time.

🚀 Tech Stack
Frontend: React 18, Vite, React Router, Context API, Lucide Icons
Backend: Node.js, Express.js
Database: MongoDB Atlas, Mongoose
Real-Time Engine: Socket.io
Authentication: JWT (JSON Web Tokens), bcrypt.js
✨ Key Features
🛍️ Customer Portal
Bilingual Support: Instantly toggle the entire store UI and product descriptions between English and Hindi.
Smart Shopping: Browse products by categories (Fruits & Veg, Dairy, Staples, Snacks, etc.) with real-time stock status.
Cart & Checkout: Dynamic cart calculation (subtotal, delivery fee logic) and secure checkout with delivery/pickup options.
Live Order Tracking: A visual status pipeline (Pending → Accepted → Preparing → Out for Delivery → Delivered) that updates instantly on the screen via WebSockets the moment the store owner changes the status.

🏪 Store Owner Dashboard
 Username : owner@apnabazar.com
 Password : ApnaBazar@123
Secure Access: Protected route for the store owner using JWT authentication.
Live Order Notifications: Socket.io pushes instant popup alerts to the dashboard whenever a customer places a new order.
Order Management: Accept, reject, or update the status of active orders with a single click.
Inventory Control: Add new products, update prices, change stock availability, and manage Hindi translations through an intuitive modal interface.
Business Analytics: Dashboard overview showing today's revenue, total customers, pending orders, and recent transactions.
⚙️ Environment Variables (Setup)

To run this project locally, you will need to add the following .env variables:

Backend (kirana_backend/.env)

env
PORT=5001
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
OWNER_PASSWORD=your_owner_password
CLIENT_URL=http://localhost:5173

Frontend (kirana_frontend/.env)

env
VITE_API_URL=http://localhost:5001
🛠️ How to Run Locally
Clone the repository.
Open two terminals (one for kirana_backend and one for kirana_frontend).
Run npm install in both folders.
Run npm run seed in the backend folder to automatically populate the database with 25 initial products and create the owner account.
Run npm run dev in both folders.
Open http://localhost:5173 in your browser!
