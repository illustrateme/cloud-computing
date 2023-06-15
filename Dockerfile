# Use the official Node.js 16 image as the base image
FROM node:16-slim

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install the dependencies using npm
RUN npm install --production

# Copy the rest of the application files to the container
COPY . .

# Expose port 3000 for the application
EXPOSE 5000

# Start the application using the "start" script defined in package.json
CMD npm run start 