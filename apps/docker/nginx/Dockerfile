FROM nginx:stable-alpine
WORKDIR /apps/frontend
COPY --from=build /apps/frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]