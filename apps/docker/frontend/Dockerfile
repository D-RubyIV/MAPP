# Stage 1: Build the Node.js application
FROM node:18-alpine as BUILD

# Set the working directory within the container to /app
WORKDIR /apps/frontend

COPY package*.json ./
COPY package*.js ./
RUN npm install
# RUN npm install typescript
COPY . .
RUN npm run build
EXPOSE 3000

FROM nginx:stable-alpine
COPY --from=build /apps/frontend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]