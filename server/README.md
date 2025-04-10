# Empathy Technologies Backend Assignment

## Technologies Used

- **Programming Language**: TypeScript
- **Backend Framework**: Express.js
- **Validation**: Zod
- **HTTP Client**: Axios
- **Build Tool**: Bun

## Prerequisites

- **Bun**: Ensure Bun is installed on your system. You can download it from the [official site](https://bun.sh/).
- **Node.js**: Required for some dependencies.
- **Environment Variables**: Create a `.env` file in the root directory with the following variables:
    ```env
    FRONTEND_URL=<your-frontend-url>
    PORT=<server-port>
    INSTAGRAM_CLIENT_ID=<your-instagram-client-id>
    INSTAGRAM_CLIENT_SECRET=<your-instagram-client-secret>
    INSTAGRAM_REDIRECT_URI=<your-instagram-redirect-uri>
    ```

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd empathy-technologies-assignment/server
    ```

3. Install dependencies:

    ```bash
    bun install
    ```

4. Build the project:

    ```bash
    bun run build
    ```

5. Start the server:
    ```bash
    bun run start
    ```

## Routes Information

### Authentication

#### `GET /auth`

- **Description**: Redirects to Instagram OAuth.
- **Query Parameters**: None
- **Response**: Redirect URL

#### `GET /auth/callback`

- **Description**: Handles Instagram OAuth callback.
- **Query Parameters**:
    - `code`: Authorization code from Instagram
- **Response**: Sets cookies for access token and expiration.

### Media

#### `GET /media`

- **Description**: Fetches paginated media for the authenticated user.
- **Query Parameters**:
    - `after` (optional): Cursor for pagination
- **Response**: List of media items.

#### `GET /media/:media_id`

- **Description**: Fetches details of a specific media item.
- **Path Parameters**:
    - `media_id`: ID of the media item
- **Response**: Media details.

### Comments

#### `GET /media/:media_id/comments`

- **Description**: Fetches comments for a specific media item.
- **Path Parameters**:
    - `media_id`: ID of the media item
- **Query Parameters**:
    - `after` (optional): Cursor for pagination
- **Response**: List of comments.

#### `POST /media/:media_id/comments`

- **Description**: Creates a new comment on a media item.
- **Path Parameters**:
    - `media_id`: ID of the media item
- **Body**:
    ```json
    {
        "text": "Your comment text"
    }
    ```
- **Response**: Created comment details.

### Replies

#### `GET /media/:media_id/comments/:comment_id/replies`

- **Description**: Fetches replies to a specific comment.
- **Path Parameters**:
    - `media_id`: ID of the media item
    - `comment_id`: ID of the comment
- **Response**: List of replies.

#### `POST /media/:media_id/comments/:comment_id/replies`

- **Description**: Creates a reply to a specific comment.
- **Path Parameters**:
    - `media_id`: ID of the media item
    - `comment_id`: ID of the comment
- **Body**:
    ```json
    {
        "text": "Your reply text"
    }
    ```
- **Response**: Created reply details.
