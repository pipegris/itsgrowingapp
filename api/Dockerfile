FROM node:16.14-alpine

WORKDIR /app
COPY package.json .
RUN npm install --quiet
COPY . .
