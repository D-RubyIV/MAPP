FROM nginx
COPY apps/frontend/dist /usr/share/nginx/html
COPY apps/nginx/default.conf /etc/nginx
VOLUME /usr/share/nginx/html
VOLUME /etc/nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
