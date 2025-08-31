FROM node:18

WORKDIR /app/mediFlow

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]

EXPOSE 3000