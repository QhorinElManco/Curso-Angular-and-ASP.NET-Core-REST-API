FROM node:22-alpine AS builder
COPY package*.json ./
RUN npm install && mkdir /app && mv ./node_modules /app/node_modules
WORKDIR /app
COPY . .
RUN npm run build


FROM nginx:alpine AS production
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]


FROM node:22-alpine AS development
WORKDIR /app
COPY package*.json angular.json tsconfig.json ./
RUN npm install
COPY . ./
EXPOSE 4200
#CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
CMD ["npm", "start"]
