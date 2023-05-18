# Stage 1: Build Angular application
FROM node:14 as builder

WORKDIR /app

COPY package.json ./

RUN npm ci

COPY . .

RUN npm run build -- --configuration=production

# Stage 2: Serve Angular application with Nginx
FROM nginx:latest

COPY --from=builder /app/dist/kumaaraso-radio-client /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
