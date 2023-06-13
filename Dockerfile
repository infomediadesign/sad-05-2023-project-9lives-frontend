FROM node:20.3-buster

WORKDIR /sad-05-2023-project-9lives-frontend/
COPY package.json .
RUN npm config set legacy-peer-deps true
RUN npm install
COPY . .
CMD ["npm", "start"]