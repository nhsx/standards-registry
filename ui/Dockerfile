FROM node:16-alpine

WORKDIR /app

RUN apk upgrade --no-cache

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci --production --include-optional --ignore-scripts

COPY . /app

ARG NEXT_PUBLIC_TAG_ID
ARG NEXT_PUBLIC_TRACKING_ID

RUN echo "NEXT_PUBLIC_TAG_ID=${NEXT_PUBLIC_TAG_ID}" >> .env.production
RUN echo "NEXT_PUBLIC_TRACKING_ID=${NEXT_PUBLIC_TRACKING_ID}" >> .env.production
RUN echo "NEXT_PUBLIC_SITE_CODE=${NEXT_PUBLIC_SITE_CODE}" >> .env.production

RUN npm run build --production  --if-present

CMD npm start
