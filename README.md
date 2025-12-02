# 🚀 **AI Interview Tutor — Intelligent Mock Interview & Performance Analysis System**

An AI–powered mock interview platform built with **Next.js 16, TailwindCSS, and Gemini API**.
It dynamically generates interview questions, evaluates answers in real time, and produces a detailed performance dashboard including **strengths, weaknesses, and recommendations**.

Live Demo (if deployed):
👉 [https://your-project-url.vercel.app](https://interview-prep-ai-navy.vercel.app/)

---

## ⭐ **Features**

### 🎯 **AI Interview Generation**

* Auto-generated questions based on:

  * Job role
  * Difficulty (Easy / Medium / Hard)
  * Interview type (Technical / HR / Behavioral / Mixed)

### ⚡ **Instant Answer Evaluation**

* AI scores each answer (0–10)
* Provides feedback and improvement suggestions
* Tracks all Q&A history

### 📊 **Final Performance Dashboard**

Includes:

* Overall Score
* Strengths
* Areas for Improvement
* Personalized Recommendations

### 🧠 **Smart UI Flow**

* Landing dashboard with features overview
* Step-by-step guided interview process
* Clean, modern, dark-mode UI

### 🎨 **Beautiful UI**

* Gradient background
* Glowing effects
* Glassmorphism cards
* Fully responsive
* Smooth UX

---

## 🖼️ **Screenshots**

### 🔹 Landing Page

(Add your screenshot here)

### 🔹 Question & Answer Screen

(Add screenshot)

### 🔹 Final Performance Dashboard

(Add screenshot)

---

## 🛠️ **Tech Stack**

| Technology      | Description                         |
| --------------- | ----------------------------------- |
| **Next.js 16**  | App Router, serverless API routes   |
| **React**       | UI components, state management     |
| **TailwindCSS** | Styling                             |
| **Gemini API**  | AI question generation & evaluation |
| **Vercel**      | Deployment                          |

---

## 📦 **Project Structure**

```
src/
  app/
    page.js              // Landing page
    interview/
      page.js            // Main interview app
    api/
      interview/
        route.js         // AI logic using Gemini
lib/
  gemini.js              // Gemini client config
public/
  ...assets
```

---

## 🔑 **Environment Variables**

Create a `.env.local` file:

```
GEMINI_API_KEY=your_api_key_here
```

Get your Gemini API key here:
[https://ai.google.dev/](https://ai.google.dev/)

---

## 🚀 **Installation & Setup**

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

Navigate to:

👉 `http://localhost:3000`

---

## 🧪 **How It Works**

### **Step 1:** User selects role

### **Step 2:** Choose difficulty

### **Step 3:** Select interview type

### **Step 4:** AI asks 5 questions, evaluates answers

### **Step 5:** Final dashboard report generated

All with real-time AI responses.

---

## 📡 **API Logic Overview**

The API:

* Sends user role, difficulty, type, and history to Gemini
* Gets JSON-only structured output
* Handles ongoing or final interview modes
* Produces a clean final report

---

## 📈 **Future Enhancements**

* Voice-based answers
* Resume analysis & job match
* Save report history (MongoDB)
* Authentication (NextAuth / Clerk)
* Export report as PDF
* ChatGPT-like UI

---

## 🤝 **Contributing**

Pull requests are welcome.
For major changes, please open an issue first to discuss.

---

## 📝 **License**

MIT License © 2025 Your Name

---

# 🌟 **If you like this project, please ⭐ the repository!**
