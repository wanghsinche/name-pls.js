FROM node:16.13.2-slim
COPY .next .next
COPY package.json package.json
ENV PORT=3000
EXPOSE 3000
CMD [ "npm run start" ]