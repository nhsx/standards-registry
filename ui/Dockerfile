FROM node:16-alpine

WORKDIR /app

RUN apk upgrade --no-cache

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci --production --no-optional --ignore-scripts
RUN npm run build --production  --if-present

COPY . /app

CMD npm start
