FROM node:18-alpine as BUILD
WORKDIR /apps/frontend
COPY ./apps/frontend .
RUN npm install
EXPOSE 4173
CMD ["npm", "run", "preview"]
