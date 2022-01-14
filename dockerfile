FROM node:16-alpine

WORKDIR /app

RUN apk add --update --no-cache \
    make \
    curl \
    python3 \
    g++ \
    libstdc++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

COPY . .

RUN npm install


RUN npm run build

EXPOSE 3000

CMD ["npm","start"]
