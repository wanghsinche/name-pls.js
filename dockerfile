FROM ubuntu:bionic

RUN apt-get update && apt-get install -y \
	curl \
	git

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - \
	&& curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
	&& echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install -y \
	nodejs \
	yarn \
	libcairo2-dev \
	libjpeg-dev \
	libpango1.0-dev \
	libgif-dev \
	libpng-dev \
	build-essential \
	g++

WORKDIR /app

COPY . .

RUN yarn install


RUN yarn run build

EXPOSE 3000

CMD ["yarn","start"]
