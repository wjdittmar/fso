FROM node:20

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm run build

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm start is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]