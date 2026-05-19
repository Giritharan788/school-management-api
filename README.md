# School Management API

This is a Node.js API built with Express and MySQL for managing schools and finding the nearest ones.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Database Setup:**
   - Execute the SQL in `init.sql` in your MySQL database to create the table.
   - Copy `.env.example` to `.env` and fill in your database credentials.

3. **Start the server:**
   ```bash
   node index.js
   ```

## APIs

1. **Add School**: `POST /api/addSchool`
   - Body: `name`, `address`, `latitude`, `longitude`
2. **List Schools**: `GET /api/listSchools?latitude=12.9716&longitude=77.5946`
   - Returns a list of schools sorted by proximity.

## Postman Testing
Import `Postman_Collection.json` into Postman to test the endpoints.
