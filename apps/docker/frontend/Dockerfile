# Stage 1: Build the Node.js application
FROM node:18-alpine as BUILD

# Set the working directory within the container to /app
WORKDIR /apps/frontend
COPY ./apps/frontend .
RUN npm install
EXPOSE 3000
# RUN npm install typescript
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /apps/frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]