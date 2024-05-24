From node:20-alpine as backend 

# Create app directory  

RUN mkdir -p /home/node/app/backend/node_modules && chown -R node:node /home/node/app/backend
WORKDIR /home/node/app/backend
COPY --chown=node:node package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 5000
CMD [ "npm", "start" ]


