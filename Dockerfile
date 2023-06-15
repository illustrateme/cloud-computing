# Use the official Node.js 16 image as the base image
FROM node:lts-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json  ./

# Copy the rest of the application files to the container
COPY . .

# Install the dependencies using npm
# RUN apt-get update -y 
# RUN apt-get install -y openssl 
RUN npm install --production 
RUN npx prisma generate 

# Expose port 5000 for the application
EXPOSE 8080

# Start the application using the "start" script defined in package.json
CMD ["npm", "start"] 