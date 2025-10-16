FROM node:latest
WORKDIR /ecommerceAPI
COPY . .
RUN npm install
EXPOSE 4800
CMD ["npm", "start"]
