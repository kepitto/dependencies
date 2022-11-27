**Services**  
API - customerservice.js  
returns a list of customer with attributes via json.

Consumer1 - consumer1.js  
prints name, email & status  

Consumer2 - consumer2.js  
prints names and an aggregated balance.

***Contract Testing***  
The contract testing was achieved via pact.   

**Testing through the consumer**  
First both the Consumer were written (consumer1.js & consumer2.js) and for both a consumer*.spec.js was created.   
The consumer*.spec.js contains the test for a specific consumer without the need of the API-service.  
An expected response is specified for both consumer (consumer1 - name, email, status; consumer2 - name, products).  
A pact file is then created which describes the interaction between both participants.  
(npm run test:consumer)

**Testing through pact files and the service (API)**  
The created pact files are used to verify if the service complies with the expected response.
(npm run test:service)

**Running the example:**  
The dockerimage isnt pushed to dockerhub, but only built locally

_docker build . --file Dockerfile --tag kepitto/dependencies_  
_docker-compose up_