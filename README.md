# ShieldStack


A small, production‑style starter for **RBAC** (roles & permissions) + **Audit log** with a **Java Spring Boot** API and **React** admin.


## Quick Start

### 1) Start the database (Postgres)

```bash
cd deploy
docker compose up -d
```

### 2) Run the backend API

```bash
cd api
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`.

### 3) Run the React admin (frontend)

```bash
cd web
npm install
npm run dev
```

The frontend will be available at the URL shown by Vite (typically `http://localhost:5173`) and will call the backend at `http://localhost:8080`.
