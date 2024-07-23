# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Run Prisma generate to generate the Prisma Client
RUN npx prisma generate

# Expose the application port
EXPOSE 3000

# Command to run the migrations and start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
