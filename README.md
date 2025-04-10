# Empathy Technologies Assignment

## Overview

This project is an Instagram clone built using modern web technologies. It provides features like user authentication, media feed, profile management, and commenting on posts. The application consists of two main parts:

1. **Frontend**: Built with Next.js and styled using Tailwind CSS.
2. **Backend**: Developed with TypeScript and Express.js, using Bun as the runtime.

## Prerequisites

-   **Bun**: Ensure Bun is installed on your system. You can download it from the [official site](https://bun.sh/).
-   **Node.js**: Required for compatibility with some dependencies.
-   **Environment Variables**: Both the frontend and backend require environment variables. Refer to their respective README files for details.

## Port Forwarding for Redirect URIs

Instagram's OAuth requires redirect URIs to be HTTPS and cannot use `localhost`. To work around this during development, you can use one of the following methods:

1. **VS Code's Native Port Forwarding**:

    - If you're using VS Code, you can forward your local development server's port to a public HTTPS URL.
    - Refer to the [VS Code documentation](https://code.visualstudio.com/docs/remote/ssh#_forwarding-a-port) for setup instructions.

2. **Ngrok**:
    - Install Ngrok from [ngrok.com](https://ngrok.com/).
    - Run the following command to expose your local server:
        ```bash
        ngrok http <your-local-port>
        ```
    - Use the generated HTTPS URL as your redirect URI.

## Project Structure

This repository contains the following directories:

-   **Frontend**: Located in the `www/` directory. Refer to the [Frontend README](www/README.md) for setup and usage instructions.
-   **Backend**: Located in the `server/` directory. Refer to the [Backend README](server/README.md) for setup and usage instructions.

## Getting Started

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd empathy-technologies-assignment
    ```

2. Set up the backend:

    ```bash
    cd server
    bun install
    bun run build
    bun run start
    ```

3. Set up the frontend:

    ```bash
    cd ../www
    bun install
    bun run dev
    ```

4. Use port forwarding (as described above) to configure your redirect URIs.

5. Open the application in your browser and start exploring!

---

## Running with Docker

Alternatively, you can run the entire project using Docker. This is the easiest way to test everything locally in an isolated environment.

### Step 1: Set up your `.env` files

-   Create `.env` files in both the `server/` and `www/` directories with the required variables. Refer to the respective READMEs in each folder for guidance.

### Step 2: Build and run the containers

From the project root:

```bash
docker compose up --build
```

This will:

-   Build the frontend and backend using the Dockerfile in each directory.
-   Start both containers.

### Step 3: Configure your redirect URI

Use **ngrok** or **VS Code's port forwarding** to expose your frontend (typically port 3000) over HTTPS.  
Then, make sure to **add the port-forwarded URL with `/auth/callback` appended** to the list of **Valid OAuth Redirect URIs** in your Facebook Developer Portal.

> Example: `https://abc123.ngrok.io/auth/callback`

Once set, you can test the full Instagram login flow and features locally through the public HTTPS tunnel.
