FROM node:16-alpine

WORKDIR /app

RUN apk upgrade --no-cache

COPY --chown=node:node . /app

RUN touch .env.production
RUN chown node:node .env.production

USER node

RUN npm ci --production --include-optional --ignore-scripts

ARG NEXT_PUBLIC_TAG_ID
ARG NEXT_PUBLIC_TRACKING_ID
ARG NEXT_PUBLIC_SITE_CODE
ARG NEXT_PUBLIC_ENV

RUN echo "NEXT_PUBLIC_ENV=${NEXT_PUBLIC_ENV}" >> .env.production
RUN echo "NEXT_PUBLIC_TAG_ID=${NEXT_PUBLIC_TAG_ID}" >> .env.production
RUN echo "NEXT_PUBLIC_TRACKING_ID=${NEXT_PUBLIC_TRACKING_ID}" >> .env.production
RUN echo "NEXT_PUBLIC_SITE_CODE=${NEXT_PUBLIC_SITE_CODE}" >> .env.production

RUN npm run build --production  --if-present

CMD npm start
