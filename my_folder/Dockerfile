# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app
# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN rm -rf node_modules
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on (default is usually 3000)
EXPOSE 3000

# Command to run your app
CMD ["node", "server.js"]