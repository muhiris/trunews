# TruNews - A News Aggregator with AI Fact-Checking

TruNews is a project that aims to showcase multiple news articles and utilize AI to detect contradictory news. Users can upvote, downvote, and publish news articles.

## Getting Started - Run frontend, backend, and AI component concurrently

### Prerequisites

Ensure you have the following installed on your system:

- Node.js and npm
- Python (preferably Python 3.x)
- Necessary dependencies for each component

### To run the frontend, follow these steps:
  ```bash
    cd frontend
    npm install
    npm run dev
  ```

The frontend uses Vite as a build tool.

### To set up the backend, follow these steps:

    ```bash
    cd backend
    npm install
    npm start
    ```

### For the AI component, follow these steps:

1. Navigate to the `ai` directory:
    ```bash
    cd ai
    ```
2. If you are using Linux, run:
    ```bash
    bash commands.sh
    ```
   If you are using Windows, run:
    ```bash
    setup.bat
    ```
3. Run the main Python script:
    ```bash
    python main.py
    ```
   or
    ```bash
    python3 main.py
    ```

### Common Issues

- **Dependencies**: Make sure you have all the necessary dependencies installed. If you encounter any issues, check the `package.json` for frontend and backend, and `requirements.txt` for the AI component.
- **Port Conflicts**: Ensure that the ports used by the frontend (usually 5173), backend (usually 4000), and AI component are not being used by other applications.
