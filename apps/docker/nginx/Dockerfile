FROM nginx:stable-alpine
WORKDIR /apps/frontend
COPY --from=build /apps/frontend/dist /var/www/html
RUN rm /etc/nginx/conf.d/default.conf
WORKDIR /
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]