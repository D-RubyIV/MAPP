FROM node:18-alpine as BUILD
WORKDIR /apps/frontend
COPY ./apps/frontend .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "dev"]
