# SenecTask API Server

A Node.js-based API server for SenecTask, a collaborative task and event management platform designed exclusively for Seneca Polytechnic users. It handles user registration, event creation, task assignment, and more, with strict email validation for `@myseneca.ca` or `@senecapolytechnic.ca` domains.

## Features

- **User Registration**: Secure signup with email validation, password hashing, and user type assignment (Admin/Moderator/User).
- **Event Management**: Create and manage events with tasks linked to them.
- **Task Tracking**: Assign tasks to users, track status (Pending/In Progress/Completed), and associate with events.
- **Authentication**: Planned JWT-based login and protected routes.
- **Testing**: Comprehensive unit and integration tests using Jest.
- **Deployment**: Configured for Vercel with CI/CD via GitHub Actions.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: bcryptjs for password hashing, dotenv for environment variables
- **Testing**: Jest, Supertest
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## Installation

1. Fork and Clone the repository:

    ### In your terminal, run:
   ```bash
   git clone https://github.com/your-GitHub-username/eventServer.git
   cd eventServer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see below).

    ### Environment Variables

    Create a `.env` file in the root directory with the following (example values):

    ```
    MONGO_URI=mongodb+srv://username:<db_password>@cluster0.opghal3.mongodb.net/?appName=Cluster0
    SALTROUNDS=12  # Number of salt rounds for bcrypt
    PORT=8080
    ```

## Running the App

- **Development**: `npm start` (uses `--watch` for auto-reload).
- **Production**: Deploy to Vercel or run `node index.js`.

The server will connect to MongoDB and start on the specified port (default 8080).

## API Endpoints

### Signup sample output
- **GET /signup**: Welcome message.
  - Response: `{ "message": "Welcome to the signup page" }`
- **POST /signup**: Register a new user.
  - Body: `{ "email": "user@myseneca.ca", "password": "SecurePass1@", "confirmPassword": "SecurePass1@", "userType": "User" }`
  - Response: `{ "message": "User created successfully" }` or error (e.g., invalid email, password mismatch).

### Default
- **GET /**: Welcome to the SenecTask API.
  - Response: `"Welcome to the SEENECTASK API"`

*Note: Additional routes for login, events, and tasks are planned. See contributing to help implement them.*

## Testing

Run tests with:
```bash
npm test
```

Tests cover email validation, password rules, hashing, and environment variables. Add more tests for new features.

## Contributing

We welccome contributions! To do so:

1. Fork the repo and create a branch.
2. Make changes, add tests, and ensure `npm test` passes.
3. Submit a PR to `main`.

For questions, open an issue or contact the maintainer.
