# 💸 SmartSpend – Smart Expense Tracker Web Application

SmartSpend is a **secure**, **user-friendly**, and **intuitive** expense tracker designed to empower individuals to manage their finances effortlessly. With modern design, personalized analytics, smart alerts, and full accessibility—SmartSpend brings powerful budgeting tools to your fingertips.

---

##  Table of Contents
- [🌟 Features](#-features)
- [🗂 Project Structure](#-project-structure)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Setup & Run](#-setup--run)
- [💡 Key Usage Instructions](#-key-usage-instructions)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [🙏 Acknowledgements](#-acknowledgements)

---

##  Features

**Authentication & Security**
- Role-based user registration & login
- Email & OTP verification
- Secure password storage (BCrypt)
- Password reset via secure email link
- Robust session and error handling

**Expense & Budget Management**
- Full CRUD for transactions (title, amount ₹, category, date, description)
- Custom & smart categories with auto-updating
- Recurring transactions with quick toggle
- Weekly & monthly budgets with real-time progress visuals
- Flexible allocation (weekly / monthly / both / excluded)

**Analytics & Dashboard**
- Actionable dashboard summary (income, expenses, balance)
- Interactive donut/pie charts
- Filtering by date, category, amount, type
- Export to PDF (iText) or Excel (Apache POI)

**Notifications & Sync**
- Smart nudges for unusual spending or savings habits
- Budget alerts (email, in-app, push/WebSocket)
- Cloud backup and auto/manual sync options

**UX & Accessibility**
- Attractive dark mode interface
- Responsive layout for mobile/tablet/desktop
- Clean icons, floating action button, intuitive layout
- ARIA-compliant labels and keyboard navigation

---

##  Project Structure

/
├── components/ # React UI components
├── App.tsx # Main application component
├── constants.ts # Application-wide constants
├── index.html # Base HTML template
├── index.tsx # App entry point (React DOM rendering)
├── metadata.json # Project metadata (e.g., version, author)
├── package.json # Dependencies & scripts
├── tsconfig.json # TypeScript configuration
├── types.ts # Type definitions and interfaces
└── vite.config.ts # Vite build and dev server configuration


> Your codebase appears to be primarily the **frontend application** built with React + TypeScript using Vite. Integrations like backend APIs, security, and sync logic would connect to this UI layer.

---

##  Tech Stack

- **Frontend Framework**: React (TypeScript)
- **Bundler / Dev Tooling**: Vite
- **Styling**: Tailwind CSS or Bootstrap with custom dark theme
- **Visualization**: Chart.js or Recharts
- **Build Tools**: npm with scripts defined in `package.json`
- **Types**: Strong typing via TypeScript (`tsconfig.json`, `types.ts`)

*(Backend technologies like Spring Boot, WebSocket, email, and databases would apply when the backend is integrated, which may be part of another repository or upcoming module.)*

---

##  Getting Started

### Prerequisites
- Node.js and npm installed

### Setup & Run
```bash
# Clone the repository
git clone https://github.com/VINOTHPADMANABAN2809/Personal-Expense-Tracker-.git
cd Personal-Expense-Tracker-

# Install dependencies
npm install

# Start development server
npm run dev
```

Key Usage Instructions

Start the app via the dev server and open it in your browser.

Use the intuitive UI powered by React to:

View summary dashboard (income, expenses, balance)

Add, edit, and delete transactions via forms

Create and manage categories

Track weekly/monthly budgets with real-time feedback

Visualize data using charts

See alerts or nudges in real time

Download filtered reports (PDF / Excel) if backend supports it

Settings like dark mode and sync intervals may be accessible via app UI
Acknowledgements

Inspired by modern fintech UI/UX patterns and budgeting workflows

Thanks to all contributors and the open-source community for support!
