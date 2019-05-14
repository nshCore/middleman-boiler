FROM nginx:alpine As prod
MAINTAINER James Kirby <nshcore@protonmail.ch>
ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8
RUN apk add openssl
USER root
WORKDIR /
RUN set RANDFILE=/srv/.rnd
RUN mkdir -p /srv/www
RUN mkdir -p /srv/log
RUN mkdir -p /etc/nginx/ssl
RUN touch /srv/log/nginx-stdout.log
ADD dist /srv/www
RUN openssl dhparam -out /etc/nginx/ssl/dhparam.pem 1024 > /dev/null
RUN openssl req -new -newkey rsa:1024 -days 360 -nodes -x509 \
    -subj "/C=UK/ST=London/L=London/O=Dis/CN=some-domain.tld" \
    -keyout /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.crt > /dev/null
RUN rm /etc/nginx/conf.d/default.conf
ADD docker/atlascity.conf /etc/nginx/conf.d/default.conf
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
