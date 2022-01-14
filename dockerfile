FROM ubuntu:20.04

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && \
apt-get install -y nodejs

WORKDIR /app

COPY . .

RUN npm install

RUN npm build

EXPOSE 3000

CMD ["npm","start"]