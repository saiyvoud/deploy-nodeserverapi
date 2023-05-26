
FROM node:16

# ENV URL_DATABASE_PRODUCT mongodb+srv://saiyvouds:u3q2ASxgYExB4gFb@cluster0.7yj5o8i.mongodb.net/NodeServerCourse
# ENV PORT 3000
# ENV SECRET_KEY  NODE_SERVER_API
# ENV CLOUDINARY_NAME  dmov0s3nm
# ENV CLOUDINARY_API_KEY  953537591318697
# ENV CLOUDINARY_API_SECRET  npzrG9QgTzFSosGEJgxB4O1sHgQ
# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the required npm packages
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Specify the command to run when the container starts
CMD ["npm", "start"]
