# 🛒 E-Commerce Full-Stack Application

A modern, full-stack E-Commerce web application built with **Spring Boot 3 (Java 21)**, **React 18**, and **MongoDB**. Includes product catalog management, shopping cart, customer checkout orders, product reviews/ratings, and an automated store assistant chatbot.

---

## 🏗️ Architecture & Tech Stack

```mermaid
graph LR
    User[Browser / Client] -->|React 18 UI| Frontend["React Frontend (Port 3000)"]
    Frontend -->|REST APIs (JSON)| Backend["Spring Boot Backend (Port 8080)"]
    Backend -->|Spring Data Mongo| Database[("MongoDB (Port 27017)")]
```

| Layer | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18, Axios, Tailwind CSS | Responsive SPA for storefront, admin, cart, and reviews |
| **Backend** | Spring Boot 3.2.5, Java 21, Maven | REST API handling Products, Orders, and Reviews |
| **Database** | MongoDB 7.0 / MongoDB Atlas | Document database for products, orders, and reviews |
| **DevOps / Containers** | Docker, Docker Compose, Nginx | Multi-stage Docker builds for production deployment |

---

## 📁 Project Structure

```text
e commerce-app/
├── Backend/
│   └── e_Commerce/
│       ├── src/main/java/com/myCompany/e_Commerce/
│       │   ├── ECommerceApplication.java   # Spring Boot Entrypoint
│       │   ├── Product.java                # Product Entity
│       │   ├── ProductController.java      # Product REST APIs
│       │   ├── ProductRepository.java      # Product MongoDB Repository
│       │   ├── ProductService.java         # Product Business Logic
│       │   ├── Order.java                  # Order Entity
│       │   ├── OrderController.java        # Order REST APIs
│       │   ├── OrderRepository.java        # Order MongoDB Repository
│       │   ├── Review.java                 # Review Entity
│       │   ├── ReviewController.java       # Review REST APIs
│       │   └── ReviewRepository.java       # Review MongoDB Repository
│       ├── src/main/resources/
│       │   └── application.properties      # Configurable DB URI & Port
│       ├── Dockerfile                      # Multi-stage Java 21 build
│       └── pom.xml
├── frontent/
│   ├── public/
│   │   ├── index.html
│   │   └── _redirects                      # Netlify/Render SPA rewrite
│   ├── src/
│   │   ├── api/
│   │   │   ├── config.js                   # Centralized API Base URL
│   │   │   └── productApi.js               # Axios product API
│   │   ├── components/
│   │   │   ├── AddProductForm.jsx          # Admin form to add inventory
│   │   │   ├── Cart.js                     # Shopping cart component
│   │   │   ├── Chatbot.jsx                 # AI/Automated assistant
│   │   │   ├── ProductCart.jsx             # Product card item
│   │   │   ├── ProductList.js              # Product catalog list
│   │   │   └── ProductReviews.jsx          # Reviews & star ratings
│   │   ├── App.js                          # Main application layout & state
│   │   ├── index.css
│   │   └── index.js
│   ├── .env.example                        # Frontend environment template
│   ├── Dockerfile                          # Multi-stage Node + Nginx build
│   ├── nginx.conf                          # Nginx production configuration
│   ├── vercel.json                         # Vercel SPA routing configuration
│   └── package.json
├── docker-compose.yml                      # Full-stack Docker container orchestration
├── .gitignore                              # Git exclusion rules
└── README.md                               # Project documentation
```

---

## 🚀 Running Locally

### Option 1: Quick Start with Docker Compose (Recommended)

Make sure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is installed and running.

1. In the project root, run:
   ```bash
   docker compose up --build
   ```
2. Open your browser:
   - **Frontend UI:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:8080/api/products](http://localhost:8080/api/products)
   - **MongoDB:** `localhost:27017`

To stop the containers:
```bash
docker compose down
```

---

### Option 2: Running Without Docker

#### Prerequisites
- **Java 21 JDK**
- **Node.js 18+ & npm**
- **MongoDB** running locally on `mongodb://localhost:27017` (or MongoDB Atlas URI)

#### 1. Start MongoDB
Ensure MongoDB is running locally:
```bash
mongod --dbpath <path-to-data-dir>
```

#### 2. Start the Spring Boot Backend
```bash
cd Backend/e_Commerce
./mvnw spring-boot:run
```
*(On Windows Command Prompt / PowerShell: `.\mvnw.cmd spring-boot:run`)*  
Backend starts at: [http://localhost:8080](http://localhost:8080)

#### 3. Start the React Frontend
```bash
cd frontent
npm install
npm start
```
Frontend starts at: [http://localhost:3000](http://localhost:3000)

---

## 📡 REST API Endpoints

### Products (`/api/products`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Retrieve all products |
| `GET` | `/api/products/{id}` | Get product by ID |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/{id}` | Update product details |
| `DELETE` | `/api/products/{id}` | Remove a product |

### Orders (`/api/orders`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/orders` | Retrieve all customer orders |
| `POST` | `/api/orders` | Place a new order with items & shipping address |

### Reviews (`/api/reviews`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/reviews/{productId}` | Retrieve reviews for a product |
| `POST` | `/api/reviews` | Submit a customer rating and review |

---

## ⚙️ Environment Variables

### Backend (`Backend/e_Commerce/src/main/resources/application.properties`)
| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `8080` | Port for the Spring Boot server |
| `SPRING_DATA_MONGODB_URI` / `MONGODB_URI` | `mongodb://localhost:27017/ecommerce_db` | MongoDB connection connection string (supports MongoDB Atlas) |

### Frontend (`frontent/.env`)
| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `REACT_APP_API_BASE_URL` | `http://localhost:8080/api` | Full URL to the backend `/api` endpoint |

---

## 📦 How to Upload to GitHub

Follow these steps to initialize and push this project to GitHub:

1. **Create a new repository on GitHub:**
   - Go to [github.com/new](https://github.com/new).
   - Set the repository name (e.g., `e-commerce-app`).
   - Leave it **Public** or **Private**.
   - Do **NOT** check "Initialize with README, .gitignore, or license" (we already have them).
   - Click **Create repository**.

2. **In your terminal (in the project root `d:\e commerce-app`), run:**
   ```bash
   # Initialize git
   git init

   # Set default branch to main
   git branch -M main

   # Add all files (the .gitignore will protect node_modules and target files)
   git add .

   # Commit the files
   git commit -m "feat: complete fullstack e-commerce app with Docker & deployment configs"

   # Link your GitHub repository (replace YOUR_USERNAME and YOUR_REPO)
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

   # Push to GitHub
   git push -u origin main
   ```

---

## 🌐 Production Deployment Options

### Option A: Free / Low-Cost Cloud (Render + MongoDB Atlas + Vercel)

#### Step 1: Database Setup (MongoDB Atlas)
1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a free **M0 Shared Cluster**.
3. Create a database user & password under **Database Access**.
4. In **Network Access**, add IP `0.0.0.0/0` (allow access from anywhere).
5. Copy your connection string:
   ```text
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce_db?retryWrites=true&w=majority
   ```

#### Step 2: Backend Deployment (Render or Railway)
- **Render.com:**
  1. Create a new **Web Service** connected to your GitHub repository.
  2. Set **Root Directory** to `Backend/e_Commerce`.
  3. Environment: **Java** / **Docker** (Render auto-detects `Dockerfile`).
  4. Under **Environment Variables**, add:
     - `MONGODB_URI` = `<your-mongodb-atlas-connection-string>`
  5. Deploy and copy your backend URL (e.g. `https://ecommerce-backend.onrender.com`).

#### Step 3: Frontend Deployment (Vercel or Netlify)
- **Vercel:**
  1. Import your GitHub repository on [vercel.com](https://vercel.com).
  2. Set **Root Directory** to `frontent`.
  3. Under **Environment Variables**, add:
     - `REACT_APP_API_BASE_URL` = `https://ecommerce-backend.onrender.com/api`
  4. Click **Deploy**. Vercel will automatically route traffic and use `vercel.json` for SPA rewrites.

---

### Option B: Single VPS Deployment with Docker Compose (AWS EC2 / DigitalOcean)

1. Provision an Ubuntu VPS on AWS EC2, DigitalOcean, or Hetzner.
2. Install Docker and Docker Compose on the VPS:
   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose-plugin
   ```
3. Clone your GitHub repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```
4. Update `docker-compose.yml` with your VPS IP or domain for `REACT_APP_API_BASE_URL`.
5. Launch the entire stack:
   ```bash
   docker compose up -d --build
   ```
6. Your application is live at port `3000` (frontend), `8080` (backend), and `27017` (MongoDB).

