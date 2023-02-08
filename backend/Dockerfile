FROM node:latest
WORKDIR /backend
COPY package.json ./
RUN yarn  
# if we run CMD with dev, then the image needs to have nodemon installed also
COPY . ./
EXPOSE 8080
CMD ["yarn", "dev"] 