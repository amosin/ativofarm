FROM node:10.13.0
RUN mkdir -p /ativofarm
WORKDIR /ativofarm
COPY package.json /ativofarm
RUN npm install
COPY . /ativofarm
CMD ["npm", "start"]
