
FROM node:10.15.3

WORKDIR /usr/src/app

# First copy package.json to install packages..
COPY package.json .
RUN npm i

# Copy the rest and build..
COPY . .
RUN npm run build

# Expose the running port of the application
EXPOSE 8080

# Run the application
CMD ["node", "dist/main.js"]
