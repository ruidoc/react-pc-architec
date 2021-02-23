FROM nginx:alpine

LABEL maintainer="Ruidoc"

RUN rm /etc/nginx/conf.d/default.conf

COPY config/app.nginx.conf /etc/nginx/conf.d/
COPY build /var/www

VOLUME /var/www

EXPOSE 80
