# Empathy Technologies Assignment

## Overview

This project is an Instagram clone built using modern web technologies. It provides features like user authentication, media feed, profile management, and commenting on posts. The application interacts with a backend server for data management and processing.

## Technologies Used

- **Frontend Framework**: [Next.js](https://nextjs.org/) (React-based framework)
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Prerequisites

- **Bun**: This project uses Bun as the package manager and runtime. Ensure Bun is installed on your system. You can download it from the [official site](https://bun.sh/).
- **Node.js**: Required for compatibility with some dependencies.
- **Environment Variables**: Set up the required environment variables in a `.env` file. Refer to `env.ts` for the required variables.

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd empathy-technologies-assignment/www
    ```

2. Install dependencies using Bun:

    ```bash
    bun install
    ```

3. Start the development server:

    ```bash
    bun run dev
    ```

4. Open the application in your browser at `http://localhost:3000`.

## Routes Information

The application interacts with the backend through the following routes:

### Authentication

- **Route**: `/auth/me`

    - **Description**: Fetches the authenticated user's details.
    - **Method**: `GET`
    - **Query Parameters**:
        - `access_token` (string): The user's access token.

- **Route**: `/auth/callback`
    - **Description**: Handles the OAuth callback for user authentication.
    - **Method**: `GET`
    - **Query Parameters**:
        - `code` (string): The authorization code from Instagram.

### Media

- **Route**: `/media`

    - **Description**: Fetches the user's media feed.
    - **Method**: `GET`
    - **Query Parameters**:
        - `access_token` (string): The user's access token.
        - `after` (string, optional): Cursor for pagination.

- **Route**: `/media/{media_id}`
    - **Description**: Fetches details of a specific media item.
    - **Method**: `GET`
    - **Query Parameters**:
        - `access_token` (string): The user's access token.

### Comments

- **Route**: `/media/{media_id}/comments`

    - **Description**: Fetches comments for a specific media item.
    - **Method**: `GET`
    - **Query Parameters**:
        - `access_token` (string): The user's access token.
        - `after` (string, optional): Cursor for pagination.

- **Route**: `/media/{media_id}/comments`

    - **Description**: Creates a new comment on a media item.
    - **Method**: `POST`
    - **Body**:
        ```json
        {
            "text": "string"
        }
        ```

- **Route**: `/media/{media_id}/comments/{comment_id}/replies`
    - **Description**: Creates a reply to a comment.
    - **Method**: `POST`
    - **Body**:
        ```json
        {
            "text": "string"
        }
        ```

## Folder Structure

- **`src/app`**: Contains the Next.js pages and layouts.
- **`src/components`**: Reusable UI components.
- **`src/lib`**: Utility functions, API queries, and validation schemas.
- **`src/config`**: Configuration files for constants and site metadata.
- **`src/types`**: TypeScript type definitions.
