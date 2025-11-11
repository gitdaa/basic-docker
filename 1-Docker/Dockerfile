FROM node:18-alpine

ARG APP_VERSION=1.2.3

ENV APP_VERSION=${APP_VERSION}

WORKDIR /app

COPY index.js .

EXPOSE 3000

CMD [ "node", "index.js" ]


# https://docs.docker.com/reference/dockerfile