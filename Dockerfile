FROM node:20-alpine3.20

WORKDIR /usr/src/app

COPY . .

RUN npm i

EXPOSE 3000

ENTRYPOINT [ "npm", "start", "--", "--host", "0.0.0.0", "--port", "3000" ]
