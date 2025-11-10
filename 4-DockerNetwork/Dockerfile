FROM node:18-alpine

WORKDIR /app

# Install network tools for learning
RUN apk add --no-cache curl netcat-openbsd

COPY app.js .
COPY package.json .

EXPOSE 3000

CMD ["node", "app.js"]