FROM node:16-alpine

WORKDIR /app

RUN apk upgrade --no-cache

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci --production --include-optional --ignore-scripts

COPY . /app

RUN --mount=type=secret,id=NEXT_PUBLIC_TAG_ID \
export NEXT_PUBLIC_TAG_ID=$(cat /run/secrets/NEXT_PUBLIC_TAG_ID) && \
RUN --mount=type=secret,id=NEXT_PUBLIC_TRACKING_ID \
export NEXT_PUBLIC_TRACKING_ID=$(cat /run/secrets/NEXT_PUBLIC_TRACKING_ID)

RUN echo "NEXT_PUBLIC_TAG_ID=$NEXT_PUBLIC_TAG_ID" >> .env.production
RUN echo "NEXT_PUBLIC_TRACKING_ID=$NEXT_PUBLIC_TRACKING_ID" >> .env.production

RUN npm run build --production  --if-present

CMD npm start
