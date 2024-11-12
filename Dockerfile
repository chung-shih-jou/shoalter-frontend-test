FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 1337
CMD ["yarn", "dev"]