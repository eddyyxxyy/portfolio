FROM node:24-alpine3.22

WORKDIR /usr/src/app

COPY . .

RUN HUSKY=0 npm ci

EXPOSE 3000

ENTRYPOINT [ "npm", "start", "--", "--host", "0.0.0.0", "--port", "3000" ]
