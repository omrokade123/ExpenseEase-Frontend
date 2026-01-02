# 💸 ExpenseEase – Smart Expense & Budget Management

ExpenseEase is a **full-stack MERN application** that helps users track daily expenses, manage category-wise budgets, and gain clear insights into their spending habits through an intuitive dashboard and visual analytics.

🔗 **Live Demo:** https://expense-ease-frontend-mu.vercel.app/

---

## 🚀 Features

- 🔐 Secure authentication & authorization using **JWT**
- 🧾 Add, update, and delete expenses (CRUD)
- 📊 Category-wise expense visualization (charts)
- 💰 Monthly budget setting per category
- 🚨 Over-budget alerts with visual indicators
- 📅 Date-wise expense tracking
- 🧠 Smart dashboard with totals & summaries
- 🧼 Clean empty states & graceful error handling
- 📱 Responsive and user-friendly UI

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Chart.js / Recharts
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt for password hashing

### Deployment
- Frontend: Vercel
- Backend: Render / Railway
- Database: MongoDB Atlas

---

## 🧠 Architecture Overview

- Frontend handles UI rendering, form validation, and conditional states
- Backend manages business logic, data aggregation, and authentication
- JWT middleware protects secured routes
- MongoDB indexes improve query performance
- APIs are stateless to enable horizontal scalability

---

## ⚙️ Core Business Logic

- Expense totals and category summaries are calculated on the backend
- Budget validation ensures accurate over-limit detection
- Duplicate budgets for the same category and month are prevented
- Dashboard consumes aggregated data instead of raw records

---

## 🔐 Security Measures

- Passwords hashed using bcrypt
- JWT-based authentication
- Protected API routes via middleware
- Environment variables for sensitive credentials
- User-specific data isolation using `userId`

---

## 📈 Scalability Considerations

- MongoDB indexing on `userId`, `date`, and `category`
- Pagination for transaction lists
- Aggregated APIs for dashboards
- Ready for Redis caching and load balancing
- Optimized frontend re-rendering

---

## 🧪 Edge Case Handling

- 🔴 Visual alert when expenses exceed budget
- 🪹 Clean empty states for new users
- ⚠️ Graceful UI fallback on API failure
- 📭 Zero-data dashboard support
- 🕒 Date consistency handling across timezones

---

## 🖼 Screenshots

> Screenshots of the dashboard, expense creation, budget setup, over-budget alerts, and empty states are included in the repository.

---

## 🏁 Getting Started (Local Setup)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/omrokade123/ExpenseEase-Frontend
```

### 2️⃣ Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 3️⃣ Configure environment variables
```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
### 4️⃣ Run the application
```bash
# Backend
npm run dev

# Frontend
npm start
```

## 🔮 Future Enhancements
- Advanced analytics & reports
- Export expenses (PDF / CSV)
- Role-based access control
- Notifications & reminders
- Dark mode
- Mobile application


## 👨‍💻 Author
# Om Rokade
# Final-year Computer Engineering Student
# MERN Stack Developer

## ⭐ Support
- If you like this project, please consider giving it a ⭐ on GitHub!


---

### ✅ Final Tip (Senior Dev)
- Add **screenshots** right after the Features section
- Keep your repo clean: `client/`, `server/`, `README.md`
- Pin this project on your GitHub profile

If you want, I can:
- Add **badges (Vercel, MongoDB, Node)**
- Optimize this README for **recruiters**
- Review your **GitHub repo structure**

Just tell me 👌
