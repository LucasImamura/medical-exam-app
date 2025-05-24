# Medical Exam Scheduler 🏥

This project is a Medical Exam Scheduling application built with a React frontend and a Node.js backend using TypeORM and PostgreSQL.

![image](https://github.com/user-attachments/assets/e9b66f78-65c3-40a2-b6cf-cd32414fb54d)


## Prerequisites

Before running the project locally, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **PostgreSQL** (v13 or higher)

## Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/LucasImamura/restaurant-app.git
cd medical-exam-app
```

### 2. Backend Setup

Navigate to the backend directory and install the dependencies:

```
cd Backend/MedicalExamProject
```

Then, configure the database connection in src/data-source.ts:

```
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433, // Update this if your PostgreSQL runs on a different port
  username: "YOUR_POSTGRES_USERNAME", // Replace with your PostgreSQL username
  password: "YOUR_PASSWORD_HERE", // Replace with your PostgreSQL password
  database: "YOUR_DB_NAME", // Replace with your database name
  synchronize: true,
  logging: false,
  entities: [Exam, Schedule],
  migrations: [],
  subscribers: [],
});
```

Now, the backend should be able to run at http://localhost:3000 when running this:

```
npm start
```

### 3. Frontend Setup

Navigate to the frontend directory:

```
cd ../../Frontend/my-app
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

The frontend will be up and running 🎉

Finally, access http://localhost:5173 with your browser.
