FROM nginx:stable-alpine
WORKDIR /apps/nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY /apps/nginx/default.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]