FROM node:14-alpine3.14 as build

WORKDIR /usr/src/app
COPY package*.json ./
COPY . ./
RUN npm install --silent
RUN npm rebuild node-sass --silent
RUN npm run-script build 

FROM nginx:1.21.3-alpine

EXPOSE 80
CMD ["-g", "daemon off;"]