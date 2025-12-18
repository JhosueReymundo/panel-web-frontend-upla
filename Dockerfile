FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/frontWeF/browser/. /usr/share/nginx/html/
RUN ls -la /usr/share/nginx/html/ | head -5
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80