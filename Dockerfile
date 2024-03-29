# Use an official Node runtime as a parent image
FROM node:13.12.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.0 -g --silent
COPY . ./
CMD ["npm", "start"]
# Expose the port the app runs on
EXPOSE 3000


