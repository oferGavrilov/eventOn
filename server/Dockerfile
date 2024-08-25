FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

# Command to run the migrations and start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
