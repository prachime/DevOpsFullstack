# **🚀 SupaChat — Conversational Analytics Platform**

#### **📌 Project Title**

**SupaChat: AI-Powered Conversational Analytics on Supabase + Full DevOps Pipeline**

---

#### **📖 Introduction**

SupaChat is a full-stack conversational analytics platform that allows users to query a **Supabase PostgreSQL database using natural language.**

It converts user queries into database operations and returns results as:

- 💬 Chatbot responses
- 📊 Interactive tables
- 📈 Recharts visualizations

The project is designed with a **production-grade DevOps lifecycle:**

**Build → Dockerize → Deploy → Reverse Proxy → CI/CD → Monitoring**

---

## 🧭 Table of Contents

- Architecture
- Features
- Tech Stack
- Installation
- Environment Variables
- Usage
- API Endpoints
- Docker Setup
- Deployment (AWS EC2)
- Nginx Reverse Proxy
- Monitoring Stack
- CI/CD Pipeline
- Troubleshooting
- Screenshots

---

## 🏗️ Architecture

Frontend (Next.js + React + Recharts)
↓
Backend (FastAPI)
↓
Supabase PostgreSQL
↓
Analytics Processing Layer
↓
Response (Chat + Table + Graph)

---

## ✨ Features

### 💬 Chatbot Interface
- Natural language query input
- Chat history support
- AI-like response formatting

### 📊 Analytics
- Trending articles (last 30 days)
- Topic-based filtering (AI, etc.)
- Views comparison
- Engagement insights

### 📈 Visualization
- Recharts line graph
- Dynamic table rendering
- Real-time updates

### ⚙️ DevOps Features
- Dockerized services
- CI/CD Pipeline
- Prometheus monitoring
- Grafana dashboards
- Loki + Promtail logging
- cAdvisor container metrics

---

## 🧰 Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Recharts

### Backend
- FastAPI
- Python 3.12
- Supabase Client

### Database
- Supabase PostgreSQL

### DevOps
- Docker & Docker Compose
- AWS EC2
- Nginx (Reverse Proxy)
- Prometheus
- Grafana
- Loki + Promtail
- cAdvisor
- GitHub Actions

---

## ⚙️ Installation

### 1. Clone Repository
```bash
git clone https://github.com/prachime/DevOpsFullstack
cd DevOpsFullstack
```
---

### 2. 🛠️ Backend Setup
```
- cd backend
- pip install -r requirements.txt
- uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
---
### 3. Frontend Setup
```
- cd frontend
- npm install
- npm run dev
```
---
## 🔐 Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```
## 📡 API Endpoints

| Method | Endpoint  | Description |
|--------|----------|-------------|
| GET    | /health  | Health check |
| POST   | /chat    | Natural language query |
| GET    | /test-db | Supabase connection test |
---
## 🐳 Docker Setup
```
docker-compose up -d --build
```
### Services

Service                        Port
---
Frontend                       3000
---
Backend                        8000
---
Prometheus                     9090
---
Grafana                        3001
---
Loki                           3100
---
cAdvisor                       8080

---
### ☁️ Deployment (AWS EC2)
- Deployed on AWS EC2 instance
- Docker Compose orchestration
- Public IP access
🌐 Live URL:
```
http://44.202.0.156:3000
```
  
---
## 📊 Monitoring Stack

### Prometheus

- Collects container metrics
- Integrated with cAdvisor

### Grafana
- CPU usage
- Memory usage
- Container health dashboards
- 
### Loki + Promtail
Centralized logging
System + container logs

---
### 🔁 CI/CD Pipeline

GitHub Actions workflow:

- Build frontend & backend
- Create Docker images
- Deploy to AWS EC2
- Restart containers automatically
    
---

## 🧪 Troubleshooting
### Common Issues

##### 1. Backend not connecting

- Check EC2 security group (port 8000 open)

##### 2. Grafana not loading

- Ensure container is running on port 3001

##### 3. Prometheus no data

- Check cAdvisor target in prometheus.yml

---

