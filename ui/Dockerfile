FROM node:16-alpine

WORKDIR /app

RUN apk upgrade --no-cache

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci --production --include-optional --ignore-scripts

COPY . /app

RUN echo "NEXT_PUBLIC_TRACKING_ID=$TRACKING_ID" >> .env.production

RUN npm run build --production  --if-present

CMD npm start
