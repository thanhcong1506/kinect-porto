# Bước 1: Xây dựng ứng dụng từ image của Node.js để build
FROM node:18-alpine as builder
LABEL author="thanhcong1506 <thanhcong1506@gmail.com>"

WORKDIR /app

COPY package.json package-lock.json ./ 
RUN apk add --no-cache git \
    && npm install --frozen-lockfile \
    && npm cache clean

COPY . .
RUN npm run build

# Bước 2: Triển khai ứng dụng trong một image nginx 
FROM nginx:latest

# Copy các file từ bước 1 (builder) vào thư mục của Nginx
COPY --from=builder /app/public /usr/share/nginx/html

EXPOSE 3000

# Sử dụng lệnh CMD để khởi chạy ứng dụng Next.js
CMD ["next ", "start"]
