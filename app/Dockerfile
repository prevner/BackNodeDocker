FROM node:16

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install nodemon --global

COPY . .

EXPOSE 3002

CMD [ "npm", "start" ]
