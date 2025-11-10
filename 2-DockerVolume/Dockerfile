FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY app.js .
COPY package.json .

# Create directories for volume examples
RUN mkdir -p /app/data /app/logs /app/config

EXPOSE 3000

CMD ["node", "app.js"]