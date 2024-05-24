From node:20-alpine as frontend

# Create app directory  

RUN mkdir -p /home/node/app/frontend/node_modules && chown -R node:node /home/node/app/frontend
WORKDIR /home/node/app/frontend
COPY --chown=node:node package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "npm", "start" ]


# From node:20-alpine as frontend

# # Create app directory
# RUN mkdir -p /home/node/app/frontend/node_modules && chown -R node:node /home/node/app/frontend

# WORKDIR /home/node/app/frontend

# COPY --chown=node:node package*.json ./

# USER node

# RUN npm install

# COPY --chown=node:node . .

# RUN npm build

# # Production environment
# FROM nginx:stable-alpine
# COPY --from=frontend --chown=node:node /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]