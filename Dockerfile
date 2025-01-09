# Use an official alpine nodeJS image as the base image
FROM node:alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install only production nodeJS dependencies in Docker Image
# Executes a command inside the container. 
# Here, it runs npm install --only=production to install only the production dependencies specified in package.json. 
# This helps to keep the Docker image size smaller by excluding development dependencies.
RUN npm install --only=production

# Copies all the remaining files and directories from the host machine to the current working directory (/app) inside the container.
COPY . .

# Expose the app on a port
EXPOSE 3000

# Command that runs the app
CMD ["npm", "start"]