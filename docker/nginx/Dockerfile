FROM nginx:stable-alpine
COPY --from=build /frontend/build /usr/share/nginx/html
COPY /docker/nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]