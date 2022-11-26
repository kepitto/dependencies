FROM node:19
WORKDIR ./
COPY package*.json ./
RUN npm install
#RUN npm ci --only=production
EXPOSE 8080
COPY . . 
CMD [ "npm", "start" ]
