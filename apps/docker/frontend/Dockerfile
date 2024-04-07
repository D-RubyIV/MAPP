# Stage 1: Build the Node.js application
FROM node:18-alpine as BUILD

# Set the working directory within the container to /app
WORKDIR /apps/frontend
COPY ./apps/frontend .
RUN npm install
EXPOSE 3000
# RUN npm install typescript
RUN ["npm","run","preview"]