# Didomi Backend Test

This API is based on the test https://github.com/didomi/challenges/blob/master/backend/README.md .

## Usage

From the root of the project:

* npm install: To install required packages.
* Create a .env file using the example from the .env.example file. Then, fill the credentials.
* npm start


## Running Using Docker
For easy testing locally, a docker compose file was added to initiate the API service and the postgres database.

To run :

* Ensure the docker is running
* Run `docker-compose up --build` to start the database and Initiate the app.

### Code Structure


##### Apis

This folder contains the controller, models dto files for the API to be served.

##### Services

The services folder is mainly created to help with initialization and configuration of services like sentry when it gets added


### Tests
The test folder contains tests for the services providers and controllers. 
Initiate the test using `npm run test`