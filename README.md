# Real-Time Groundwater Resource Evaluation using DWLR Data

A full-stack Smart India Hackathon 2025 project developed for the **Ministry of Jal Shakti (CGWB)**.  
This system leverages **Digital Water Level Recorder (DWLR)** data to provide **real-time groundwater evaluation**, **AI/ML-powered forecasting**, and **GIS-based visualization** through a mobile application and backend API.

---

## Features

- Integration with DWLR station datasets  
- Real-time water level monitoring and visualization  
- AI/ML-based groundwater forecasting (Prophet/ARIMA models)  
- GIS heatmaps for recharge and depletion zones  
- Alerts and notifications for abnormal depletion  
- Role-based dashboards for researchers, policymakers, and citizens  
- Cross-platform mobile app built with React Native (Expo)  
- FastAPI + PostgreSQL backend with PostGIS support  

---

## Architecture Overview

```
DWLR Stations → FastAPI Backend → PostgreSQL/PostGIS → ML Forecast Engine → React Native App
```

**Data Flow:**
1. DWLR sensors record water level data.  
2. Data ingested into FastAPI backend via API/CSV.  
3. Stored and processed in PostgreSQL.  
4. ML models predict water availability and detect anomalies.  
5. Results visualized in the mobile dashboard with maps, charts, and reports.

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React Native (Expo), ChartKit, React Native Maps |
| Backend | FastAPI, Python |
| Database | PostgreSQL + PostGIS |
| AI/ML | Facebook Prophet, Pandas |
| DevOps | Docker, Docker Compose |
| APIs | REST (Swagger available at `/docs`) |

---

## Local Setup

### Prerequisites
- Docker Desktop  
- Node.js + npm  
- Expo Go App (Android/iOS)

### Run Backend
```bash
docker-compose up --build
```
Backend runs on: `http://localhost:8000`  
Docs: `http://localhost:8000/docs`

### Generate Sample Data
```bash
python backend/utils/simulate.py --stations 10 --days 7 --out /tmp/sample.csv
curl -X POST "http://localhost:8000/ingest" -F "file=@/tmp/sample.csv"
```

### Run Mobile App
```bash
cd mobile
npm install
npx expo start
```
- Scan the QR code from Expo Go app to open it on your phone.

---

## Innovation

- AI-enhanced forecasting for predictive water management.  
- Citizen-accessible app for live DWLR data.  
- Data-driven decision-support for sustainable water policies.  
- Modular & scalable design—ready for IoT and rainfall data integration.

---

## Team Info

**Team Name:** [Accuaray 404]  
**Edition:** Smart India Hackathon 2025  
**Theme:** Miscellaneous  
**Organization:** Ministry of Jal Shakti, Central Ground Water Board (CGWB)

---

## License

This project is licensed under the [MIT License](LICENSE).  
You are free to use, modify, and distribute this software with proper attribution.

---

### 🌍 Developed with 💙 for Smart India Hackathon 2025
