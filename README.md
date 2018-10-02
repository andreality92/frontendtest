# Linkener Front End Developer Test

Welcome to the test for front end developer.

In this test we will ask you to build a simple, but beautiful page that consumes and produces data using a RESTful API.

The page you will build displays and allows for the modification of data gathered from an imaginary device. The wireframe of what is expected is in the [specification/wireframe.pdf](./specification/wireframe.pdf) file, essentially it is a table of the data and a graph. The fields `value1` and `value2` of the table should be editable and sent back to the backend.

To get the data you will need to:
1) understand the OpenAPI 3.0 specification of the RESTful service is defined in the [specification/api.yml](./specification/api.yaml) file
   > hint: https://swagger.io/
2) run the backend service on your machine
   > hint: if you have java 8 installed on your machine you can just run `java -jar backend/server.jar` please note that if port 8080 is busy on your machine you can change the server's port by setting the `SERVER_PORT` environment variable
 
## Deliverables
 
Fork this repository into your GitHub account and provide us a link to the fork with the following two items in the solution folder
1) a working implementation of the wireframe using the backend service supplied. Your solution should use either [vue](https://vuejs.org/), [angular](https://angular.io/) or [react](https://reactjs.org/). Use any additional library you see fit.
2) a markdown document (`solution/README.md`) describing:
    1) how to run your solution
    2) how to ensure that future modifications of the code will not break the existing functionality
    3) a description of your solution
    4) a justification for any framework/library choice
    5) any challenges you faced.

## What we will evaluate

1) usability
2) performance   
3) clarity of the code and the document
