FROM node:gallium-buster

WORKDIR /sad-05-2023-project-9lives-frontend/
COPY .json .
RUN npm config set legacy-peer-deps true
RUN npm install
COPY . .
CMD ["npm", "start"]