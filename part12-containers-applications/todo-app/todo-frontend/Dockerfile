FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist"]

# docker build . -t todo-frontend
# docker run -p 5001:3000 todo-frontend
# frontend will be at http://localhost:5001