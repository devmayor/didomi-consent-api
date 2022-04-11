FROM node:16

RUN mkdir -p /home/app && cd /home/app 

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
# Start app in watch mode
CMD ["npm", "run", "start:dev"]