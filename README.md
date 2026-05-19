# School Management API

This is a Node.js and Express API for managing school data. It uses MySQL for the database and calculates geographical distance to find the closest schools to a user.

## Live Links
Base URL: https://school-management-api-2qpj.onrender.com

* Add School: POST /api/addSchool 
* List Schools: GET /api/listSchools?latitude=12.9716&longitude=77.5946

## How to run locally
1. Run `npm install`
2. Add your MySQL credentials to a `.env` file
3. Run `node migrate.js` to create the database table
4. Run `npm start`

## Testing
A Postman_Collection.json file is included in this repository. You can import it into Postman to test the APIs.
