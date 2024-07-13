FROM node:18-alpine as BUILD
WORKDIR /apps/frontend
COPY ./apps/frontend .
RUN npm install
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]
