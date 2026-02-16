# Ollama AI Full Stack Chat Application

## Project Overview

This project is a full-stack AI chat application that integrates a Spring Boot backend with a Vite frontend and a locally running Ollama LLM.
The backend exposes REST APIs powered by Spring AI, while the frontend provides a simple UI to interact with the model.

---

## Tech Stack

### Backend

* Java 17
* Spring Boot 4
* Spring AI
* Ollama (Local LLM)
* Maven

### Frontend

* Vite
* HTML / CSS / JavaScript
* Node.js

---

## Project Architecture

```
Frontend (Vite App)  →  Spring Boot REST API  →  Spring AI  →  Ollama (Local LLM)
```

---

## Features

* Local AI chat using Ollama
* REST API to send prompts and receive responses
* Vite frontend for UI interaction
* Fully offline LLM setup
* Fast development environment

---

## Backend Setup (Spring Boot)

### 1. Run Ollama

Install Ollama and start the model:

```
ollama run llama3
```

Ollama runs on:

```
http://localhost:11434
```

---

### 2. Configure Application

Create `application.yml` inside:

```
src/main/resources/application.yml
```

Add:

```yaml
spring:
  ai:
    ollama:
      base-url: http://localhost:11434
      chat:
        model: llama3

server:
  port: 8080
```

---

### 3. Run Backend

Run the Spring Boot application:

```
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### 4. Test API

Open browser:

```
http://localhost:8080/
```

---

## Frontend Setup (Vite)

Navigate to frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## API Endpoint

### GET /ask

Returns AI generated response.

Example:

```
http://localhost:8080/
```
### Frontend Running

<img width="1917" height="870" alt="image" src="https://github.com/user-attachments/assets/17e695b7-5485-426b-bb78-ec7f7d25f0ff" />

## Folder Structure

```
project-root
│
├── backend (Spring Boot)
│   └── src/main/java/com/example/OllamaAI
│
├── frontend (Vite App)
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md
```

## Author

Om Gavali
