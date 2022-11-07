FROM node:16-alpine

WORKDIR /app

RUN apk upgrade --no-cache


RUN touch .env.production && chown node:node .env.production

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci --production --include-optional --ignore-scripts

COPY --chown=node:node . /app

ARG NEXT_PUBLIC_TAG_ID
ARG NEXT_PUBLIC_TRACKING_ID
ARG NEXT_PUBLIC_SITE_CODE
ARG NEXT_PUBLIC_ENV

RUN echo "NEXT_PUBLIC_ENV=${NEXT_PUBLIC_ENV}" >> .env.production
RUN echo "NEXT_PUBLIC_TAG_ID=${NEXT_PUBLIC_TAG_ID}" >> .env.production
RUN echo "NEXT_PUBLIC_TRACKING_ID=${NEXT_PUBLIC_TRACKING_ID}" >> .env.production
RUN echo "NEXT_PUBLIC_SITE_CODE=${NEXT_PUBLIC_SITE_CODE}" >> .env.production

RUN npm run build --production  --if-present

USER node

CMD npm start
