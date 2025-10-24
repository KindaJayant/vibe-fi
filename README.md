
# VibeFI AI Step-2 Challenge — MERN Ticket Classifier  
**Developer:** Jayant Singh Bisht  

---

## 🎯 Problem Statement
Develop a service that can receive a banking support ticket, decide whether it requires **AI-generated code remediation** or a **Vibe-coded troubleshooting workflow**, and return a structured plan of action.

---

## 🧩 Architecture Overview
| Layer | Stack | Purpose |
|-------|--------|----------|
| Frontend | React (Vite) | Ticket form UI + response visualization |
| Backend | Node.js, Express | API endpoints + classification logic |
| Database | MongoDB Atlas (Mongoose ODM) | Stores classification history |
| Validation | Zod | Ensures consistent input schema |
| Styling | Custom CSS (dark theme) | Clean, responsive interface |

---

## ⚙️ Core Features
- Accepts JSON input with `channel`, `severity`, and `summary`
- Classifies ticket into **AI Code Patch** or **Vibe Workflow**
- Returns structured response:
  ```json
  {
    "decision": "ai_code_patch",
    "reasoning": "Technical indicators ... favor remediation",
    "next_actions": ["Collect logs", "Generate AI patch", ...],
    "hits": { "tech": ["error","api"], "ops": [] }
  }

* Persists each decision in MongoDB Atlas (`ticketdecisions` collection)
* Includes ready sample buttons (Tech / Ops) for quick testing
* Implements CORS-safe frontend ↔ backend communication

---

## 🧠 Classification Logic

**Location:** `server/src/classifier.js`

| Trigger Type                  | Example Keywords                            | Outcome         |
| ----------------------------- | ------------------------------------------- | --------------- |
| Technical / API failures      | error, crash, api, timeout, 500, stacktrace | `ai_code_patch` |
| Operational / workflow issues | login, kyc, otp, ui, payment, form          | `vibe_workflow` |

Severity weighting (`critical`, `high`, `low`) adjusts the decision score.

---

## 🧪 Validation & Testing

* **Unit tests:** 10 mock tickets validated expected outputs
* **Integration:** React UI → Express API communication verified
* **Edge cases:** Invalid or missing fields rejected by Zod
* **Persistence:** Verified data insertion into MongoDB Atlas (`test.ticketdecisions`)
* **E2E Demo:** Both classification branches tested via live form

---

## 🧰 Local Setup

### 1️⃣ Backend

```bash
cd server
npm install
cp .env.example .env
# Fill .env with:
# PORT=4000
# MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/vibefi_challenge?retryWrites=true&w=majority
npm run dev
```

➡️ Runs on **[http://localhost:4000](http://localhost:4000)**

### 2️⃣ Frontend

```bash
cd ../client
npm install
npm run dev
```

➡️ Runs on **[http://localhost:5173](http://localhost:5173)**

### 3️⃣ Health Check

`GET http://localhost:4000/health` → `{ "ok": true }`

---

## 🧾 Example Input / Output

**POST** `/api/classify`

```json
{
  "channel": "email",
  "severity": "high",
  "summary": "API /balance returns 500 error and server timeout during peak hours"
}
```

**Response**

```json
{
  "decision": "ai_code_patch",
  "reasoning": "Technical indicators (error, api, server, timeout) with severity high favor code remediation.",
  "next_actions": [
    "Collect logs/trace (request ID, user ID, timestamp)",
    "Run error reproduction in staging",
    "Draft AI-assisted patch (scoped diff) + unit test",
    "Open PR; run CI; get code review",
    "Deploy canary; monitor metrics/alerts"
  ]
}
```

---

## 📸 Screenshots

### 🖥️ Web Interface

![VibeFI Ticket Classifier Interface](https://i.postimg.cc/HV46qkKj/Screenshot-420.png)

### ☁️ MongoDB Atlas

![MongoDB Atlas ticketdecisions Collection](https://i.postimg.cc/GHJXWmNk/Screenshot-421.png)

---

## 🤖 AI Assistance

* Used an LLM to brainstorm classification keywords and reasoning templates
* Maintained deterministic rule-based logic for reproducibility
* Optional AI validation layer can be toggled in future iterations

---

## ✅ Trade-offs

| Decision          | Rationale                                |
| ----------------- | ---------------------------------------- |
| Heuristic over ML | Simpler, auditable, deterministic        |
| MongoDB Atlas     | Cloud-ready persistence                  |
| React + Vite      | Fast development and testing             |
| Optional AI layer | Scalable for contextual decision support |

---

## 🧮 Directory Overview

```
vibefi-challenge/
 ├── server/
 │   ├── src/
 │   │   ├── index.js
 │   │   ├── classifier.js
 │   │   ├── models/
 │   │   │   └── TicketDecision.js
 │   │   └── routes/
 │   │       └── classify.js
 │   └── .env.example
 └── client/
     ├── src/
     │   ├── App.jsx
     │   ├── api.js
     │   └── styles.css
     └── vite.config.js
```

---

## 🧩 Future Extensions

* Integrate GPT-4 or Claude for semantic reasoning
* Add `/history` endpoint with frontend table view
* Deploy backend (Render / Railway) + frontend (Vercel)
* Introduce JWT auth for multi-user auditing

---

## 🏁 Outcome

A fully working **MERN micro-service** demonstrating:

* AI-assisted decision logic
* Cloud persistence and validation
* Clean, explainable reasoning pipeline

**Repository:** [https://github.com/KindaJayant/vibe-fi](https://github.com/KindaJayant/vibe-fi)

```
```
