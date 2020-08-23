FROM nginx:1.17.10
WORKDIR /code

COPY ./conf.d /etc/nginx/conf.d
COPY ./src /code
CMD exec nginx -g 'daemon off;' && certbot --nginx && certbot renew --dry-run
