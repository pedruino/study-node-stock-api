# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application source code to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Expose the debug port
EXPOSE 9229

# Start the application with inspect flag
CMD [ "node", "--inspect=0.0.0.0", "src/app.js" ]