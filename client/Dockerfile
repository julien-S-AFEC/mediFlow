FROM node:18

WORKDIR /app/mediFlow

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5174

CMD ["npm", "run", "dev"]
