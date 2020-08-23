FROM node:12.4
WORKDIR /code
COPY . .
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install -g jest@25.5.4 --verbose
CMD ["npm", "run", "test:watch"]
