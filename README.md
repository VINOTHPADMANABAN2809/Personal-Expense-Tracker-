SmartSpend – Smart Expense Tracker Web Application
SmartSpend is a secure and user-friendly expense tracker designed to empower individuals to manage their finances effortlessly. It offers intuitive budgeting, insightful analytics, personalized financial guidance, and robust customization—all with enterprise-grade security and modern design.

Features
Authentication and Security
User registration and login (with role-based access).

Email & OTP verification, secure password storage using BCrypt.

Password reset via email link.

Session management with robust error messages on login and password reset.

Expense and Budget Management
Full CRUD operations for expenses/income with support for custom fields (title, amount in INR, category, type, date, description).

Custom & Smart Categories: Create, edit, and delete categories—including on the fly from the transaction form—with automatic transaction updates when a category changes.

Recurring Transactions: Schedule and manage recurring expenses/income, with one-click conversion between recurring and regular transactions.

Budget Tracking: Set and independently manage weekly and monthly budgets with real-time visual progress. Allocate transactions to weekly, monthly, both, or neither using a simple dropdown selector.

Flexible Budget Allocation: Distinct controls to set/update amounts, expense totals, and progress for both weekly and monthly budgets.

Exclude or allocate specific transactions for budget calculations.

Analytics and Dashboard
Personalized Dashboard: Actionable, color-coded summary cards for total income, expenses, and balance; quick-add actions; friendly, inviting tone for greater engagement.

Interactive Charts: Modern donut/pie charts with real-time analysis.

Advanced Filtering and Sorting: Analyze transactions by date, amount, category, or type, and customizable search.

Reports: Export filtered transactions as PDF (via iText) or Excel (via Apache POI).

Notifications & Data Reliability
Smart Nudges/Alerts: Proactive, dismissible alerts for unusual spending or healthy money habits.

Budget Alerts: Email, in-app notifications, and WebSocket/push alerts for nearing/exceeding budgets.

Cloud Backup: Secure, auto-syncing of all user data with real-time status, customizable sync intervals (5, 10, 15 min, or off), and manual sync option.

User Experience & Accessibility
Modern, inviting dark mode with gentle colors.

Intuitive UI: Floating action button, polished icons, improved readability, interactive elements, and cleaner layouts.

Responsive design: Fully functional on mobile, tablet, and desktop.

Settings Modal: Customize auto-sync interval and other preferences.

Accessible design: Clear labels, ARIA, keyboard-friendly controls, and user-friendly error messages.

Tech Stack
Backend:

Spring Boot, Spring MVC, Spring Security, Spring Data JPA, JavaMailSender, Hibernate Validator, WebSocket (STOMP)

Email Service: SMTP/SendGrid/Mailgun

Database: MySQL / PostgreSQL / MongoDB

Frontend:

React.js (with TSX), Axios, React Router

Styling: Tailwind CSS / Bootstrap, custom dark theme

Data Visualization: Chart.js or Recharts

Testing:

JUnit 5, Mockito, MockMvc

Build & Deployment:

Maven, Docker (optional)

Render / Railway / AWS EC2 (backend)

Vercel / Netlify (frontend)

Getting Started
Prerequisites
Node.js, npm, Java 17+, Maven

Database (MySQL/Postgres/MongoDB)

Optional: Docker

Setup
Clone the repository

bash
git clone https://github.com/your-username/smartspend.git
cd smartspend
Backend

bash
cd backend
mvn clean install
# Setup environment variables for DB, SMTP, etc.
mvn spring-boot:run
Frontend

bash
cd ../frontend
npm install
npm start
Testing

Backend: mvn test

Frontend: npm test

Deployment

See /deploy instructions for Docker, Render, AWS EC2, Vercel/Netlify.

Key Usage Instructions
Sign Up / Sign In: Register with email verification; reset passwords with a secure link.

Add/Edit/Delete Transactions: Use the floating action button or summary cards; set categories, amounts (₹), recurrence, and budget allocation (weekly, monthly, both, or exclude).

Budget Tracking: Update weekly and monthly budgets independently; visual progress with clear period indicators.

Category Management: Use dedicated modal to create/rename/delete categories; link to the form for in-context creation.

Reports: Download filtered reports from the dashboard.

Auto-Sync: Allow auto-sync at chosen interval and trigger manual sync anytime.

Smart Nudges: Responsive alerts guide healthy spending automatically.

Code Organization
/backend – Spring Boot server, REST API, WebSocket, security, email

/frontend – React (TSX), components, routing, dark mode styling

/deploy – Docker, CI/CD, deployment scripts

/docs – API & architecture details

Contributing
PRs are welcome! Please read the CONTRIBUTING.md for style and workflow guidelines.

License
This project is open source and available under the MIT License.

Acknowledgements
Inspired by modern fintech practices and user-centric design.

Thanks to all contributors and the open source community.
