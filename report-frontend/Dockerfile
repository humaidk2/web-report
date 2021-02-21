FROM node:14.15.4


WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN npm install --no-optional && npm cache clean --force
COPY . .

EXPOSE 3000

CMD ["npm", "run","dev"]
