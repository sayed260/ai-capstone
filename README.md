# AI Capstone

A full-stack capstone project that applies modern web development practices to build an AI-powered application. The frontend delivers a responsive, interactive user experience, while the backend handles API logic, integrations, and data flow.

## Overview

This project demonstrates end-to-end software development—from UI design and client-side state management to server-side routing and deployment workflows. It serves as a portfolio-ready capstone showcasing practical skills in building production-style web applications with AI capabilities.

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | HTML, CSS, JavaScript, React |
| **Backend** | Node.js |
| **Version Control** | Git |

## Features

- Responsive, component-based UI built with React
- RESTful API powered by Node.js
- Clean separation between client and server
- Version-controlled development workflow with Git

> Add or update features here as the project evolves.

## Project Structure

```
ai-capstone/
├── client/          # React frontend (HTML, CSS, JavaScript)
├── server/          # Node.js backend and API routes
├── .gitignore
├── LICENSE
└── README.md
```

> Adjust this structure to match your repository layout once folders are in place.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-capstone.git
cd ai-capstone
```

### 2. Install dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
# Add API keys and other secrets here
```

> Never commit `.env` files or credentials to version control.

### 4. Run the development servers

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm start
```

The frontend typically runs at `http://localhost:3000` and the API at `http://localhost:5000`.

## Development

### Branching workflow

```bash
git checkout -b feature/your-feature-name
# Make changes, then commit
git add .
git commit -m "Describe your change"
git push origin feature/your-feature-name
```

### Scripts

| Location | Command | Description |
|----------|---------|-------------|
| `client/` | `npm start` | Start React dev server |
| `client/` | `npm run build` | Production build |
| `server/` | `npm run dev` | Start API with hot reload |
| `server/` | `npm start` | Start API in production mode |

## Deployment

1. Build the frontend: `cd client && npm run build`
2. Serve the build output and run the Node.js server on your hosting platform of choice (e.g., Vercel, Render, Railway, or a VPS)
3. Set production environment variables on your host

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## Author

**Your Name**

- GitHub: [@your-username](https://github.com/your-username)

---

Built as part of an AI Capstone project using HTML, CSS, JavaScript, React, Node.js, and Git.
