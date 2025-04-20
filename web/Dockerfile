FROM node:18
WORKDIR /app
COPY package.json ./
RUN npm install
RUN npm install mysql2
COPY . .
CMD ["node", "index.js"]