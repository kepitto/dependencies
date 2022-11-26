FROM node:19
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
#RUN npm ci --only=production
EXPOSE 8080
CMD [ "npm", "start" ]
