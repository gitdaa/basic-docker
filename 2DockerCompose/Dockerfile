# ใช้ base image
FROM node:18

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์เข้า image
COPY package.json ./
COPY . .

# ติดตั้ง dependencies
RUN npm install

# เปิด port
EXPOSE 3000

# คำสั่งเริ่มต้นเมื่อ container รัน
CMD ["npm", "start"]
