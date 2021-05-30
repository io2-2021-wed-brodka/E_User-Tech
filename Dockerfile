FROM node:14

WORKDIR /usr

COPY . .

RUN npm install

EXPOSE 4202

CMD ["npm", "start"]

