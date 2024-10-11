# Pathway-Catalyst

This project requires node and npm.  
  ```node server.js``` will boot up the app locally at port 3000.

### Run app in a container
- Docker-desktop needed
- ```docker build -t pathway```  (Build image and install all the dependencies)    
- ```docker run -p 3000:3000 pathway``` (Docker will map the container at port 3000 as well)
