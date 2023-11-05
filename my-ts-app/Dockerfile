FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
RUN npm install -g typescript
# Copy all source files
COPY . .

# Run the TypeScript compiler to generate the "dist" directory
RUN tsc

EXPOSE 5000
CMD [ "node", "dist/app.js" ]

