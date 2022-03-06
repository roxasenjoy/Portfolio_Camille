FROM php:7.2.5-apache

LABEL tag="php_web"

WORKDIR /var/www/html

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git zip unzip