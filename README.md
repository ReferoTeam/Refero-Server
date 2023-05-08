# Refero-Server

An Express.js REST server used for managing API requests from Refero's Web and Native clients.  Written fully in Typescript and using the Mongoose ORM to manage requests to the MongoDB Atlas cluster.  The server is split between two main routes of /events and /users, handling all CRUD operations to each of the two seperate collections in the Refero-Main cluster.  All routes return JSON objects containing the information requested.
