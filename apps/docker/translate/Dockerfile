FROM node:18-alpine as BUILD
WORKDIR /apps/translate
COPY ./apps/translate .
RUN npm install
EXPOSE 3005
CMD ["npm", "run", "dev"]
