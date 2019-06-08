FROM node:8-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm ci
RUN node -v && npm -v

CMD ["npm", "run", "start"]
