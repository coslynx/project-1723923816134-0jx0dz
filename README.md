<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>project-1723923816134-0jx0dz
</h1>
<h4 align="center">Web application to set, track, and share fitness goals</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework used: Next.js" />
  <img src="https://img.shields.io/badge/Frontend-Javascript,_Html,_Css-red" alt="Frontend languages used: JavaScript, HTML, CSS" />
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend framework: Node.js" />
  <img src="https://img.shields.io/badge/LLMs-Custom,_Gemini,_OpenAI-black" alt="LLMs used: Custom, Gemini, OpenAI" />
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/spectra-ai-codegen/project-1723923816134-0jx0dz?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/spectra-ai-codegen/project-1723923816134-0jx0dz?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/spectra-ai-codegen/project-1723923816134-0jx0dz?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>


## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview

This repository contains the Minimum Viable Product (MVP) for a web application called "Fitness Goal Tracker." The MVP provides a user-friendly platform for setting, tracking, and sharing fitness goals, aiming to enhance user motivation and engagement. It leverages a robust technology stack, including Next.js for the frontend, Node.js for the backend, and PostgreSQL for database storage. The application is built with a focus on modularity, scalability, and user experience.

## 📦 Features

| Feature | Description |
|---|---|
| User Authentication | Secure user registration and login using NextAuth.js with support for multiple providers (e.g., Google). |
| Goal Setting | Create personalized fitness goals with specific details (type, target, start/end dates) and track progress. |
| Goal Tracking | Automatically track progress based on user input and data from wearable devices. |
| Data Visualization | Visualize progress using interactive charts and graphs. |
| Social Feed | Share progress updates with friends and other users in a dedicated social feed. |
| Community Features | (Future expansion) Join groups and forums based on fitness interests to connect with like-minded individuals. |
| Personalized Insights | (Future expansion) Generate data-driven insights and recommendations based on user activity. |
| User-Friendly Interface | Clean, intuitive interface for easy navigation and interaction. |
| Robust Error Handling | Implement comprehensive error handling and logging to ensure a stable and reliable experience. |
| Scalable Architecture | Design the application to handle increased user load and data volume. |

## 📂 Structure

```
project-1723923816134-0jx0dz/
├── pages
│   ├── _app.tsx
│   ├── index.tsx
│   ├── goals
│   │   ├── create.tsx
│   │   ├── edit.tsx
│   │   ├── view.tsx
│   │   └── index.tsx
│   ├── profile
│   │   ├── index.tsx
│   │   └── settings.tsx
│   ├── login
│   │   └── index.tsx
│   ├── signup
│   │   └── index.tsx
│   └── dashboard
│       └── index.tsx
├── components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── GoalCard.tsx
│   ├── GoalForm.tsx
│   ├── GoalList.tsx
│   ├── ProgressChart.tsx
│   ├── SocialFeed.tsx
│   ├── UserCard.tsx
│   ├── Input.tsx
│   ├── Button.tsx
│   ├── Dropdown.tsx
│   └── Modal.tsx
├── styles
│   ├── globals.css
│   └── tailwind.config.js
├── utils
│   ├── helpers.js
│   └── api.js
├── prisma
│   ├── schema.prisma
│   └── migrations
│       └── 20231027144926_init
│           └── migration.sql
├── server
│   └── index.js
├── next.config.js
├── tsconfig.json
└── package.json

```

## 💻 Installation

### 🔧 Prerequisites
- Node.js
- npm
- Docker (optional for database setup)

### 🚀 Setup Instructions

1. Clone the repository:
   - `git clone https://github.com/spectra-ai-codegen/project-1723923816134-0jx0dz.git`
2. Navigate to the project directory:
   - `cd project-1723923816134-0jx0dz`
3. Install dependencies:
   - `npm install`
4. (Optional) Set up the database:
   - Follow the instructions in the `prisma/` directory to set up PostgreSQL. You can use Docker to simplify the setup process.

## 🏗️ Usage

### 🏃‍♂️ Running the Application

1. Start the development server:
   - `npm run dev`
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### ⚙️ Configuration

- **Environment Variables:**  Create a `.env` file in the root directory and set the following environment variables:
  - `DATABASE_URL`: The connection URL for your PostgreSQL database.
  - `NEXTAUTH_URL`: The URL of your Next.js application (e.g., `http://localhost:3000`).
  - `NEXTAUTH_SECRET`: A secret key for NextAuth.js authentication.
  - `GOOGLE_CLIENT_ID`: Google Client ID (for Google authentication).
  - `GOOGLE_CLIENT_SECRET`: Google Client Secret (for Google authentication).

## 🌐 Hosting

### 🚀 Deployment Instructions

1. **Set up a hosting platform:** Choose a platform like Vercel, Netlify, or Heroku.
2. **Configure environment variables:** Set the necessary environment variables for your chosen hosting platform.
3. **Deploy:** Follow the deployment instructions specific to your chosen platform.

#### Example: Deployment to Vercel

1. **Create a Vercel account:** If you don't have one already.
2. **Initialize Vercel:** `vercel init`
3. **Deploy:** `vercel deploy`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Authors

- **Spectra.codes** - [Spectra.codes](https://spectra.codes)
- **DRIX10** - [DRIX10](https://github.com/Drix10)

<p align="center">
  <h1 align="center">🌐 Spectra.Codes</h1>
</p>
<p align="center">
  <em>Why only generate Code? When you can generate the whole Repository!</em>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Developer-Drix10-red" alt="Developer: Drix10" />
  <img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="Website: Spectra.codes" />
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="Backed by: Google, Microsoft & Amazon for Startups" />
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="Finalist: Backdrop Build v4" />
</p>