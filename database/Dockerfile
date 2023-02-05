FROM alpine:latest

RUN apk add --update mariadb mariadb-client && \
	rm -f /var/cache/apk/*

ENV MYSQL_ROOT_PASSWORD gatito

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306


CMD ["mysqld"]
