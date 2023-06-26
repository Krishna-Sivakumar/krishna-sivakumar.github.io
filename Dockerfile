FROM node:18
WORKDIR /usr/src/app
COPY . . 
RUN npm install
RUN npm run build
EXPOSE 5300
CMD ["serve", "-s", "./dist", "-p", "5300"]
