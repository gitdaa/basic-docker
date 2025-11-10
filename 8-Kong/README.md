# Kong & Konga Docker Commands

## 1. สร้างและรัน Services ทั้งหมด
```bash
docker-compose up -d
```

## 2. ตรวจสอบสถานะ Services
```bash
docker-compose ps
```

## 3. ดู logs ของ services
```bash
docker-compose logs -f kong
docker-compose logs -f konga
docker-compose logs -f kong-database
```

## 4. หยุด services
```bash
docker-compose down
```

## 5. หยุดและลบ volumes (ข้อมูลจะหายทั้งหมด)
```bash
docker-compose down -v
```

## URLs สำหรับเข้าใช้งาน:
- **Kong Admin API**: http://localhost:8001
- **Kong Manager**: http://localhost:8002
- **Kong Proxy**: http://localhost:8000
- **Konga Admin GUI**: http://localhost:1337

## ตัวอย่างการใช้งาน Kong API:

### เพิ่ม Service
```bash
curl -i -X POST http://localhost:8001/services/ \
  --data "name=example-service" \
  --data "url=http://mockbin.org"
```

### เพิ่ม Route
```bash
curl -i -X POST http://localhost:8001/services/example-service/routes \
  --data "hosts[]=example.com"
```

### ทดสอบ API ผ่าน Kong Proxy
```bash
curl -i -X GET http://localhost:8000/ \
  --header "Host: example.com"
```

## การตั้งค่า Konga ครั้งแรก:
1. เปิดเบราว์เซอร์ไปที่ http://localhost:1337
2. สร้าง Admin account
3. เชื่อมต่อกับ Kong Admin API: `http://kong:8001`
4. ใช้งาน GUI ในการจัดการ Kong

## คำอธิบาย Services:

### kong-database (PostgreSQL)
- เป็น database backend สำหรับ Kong
- ใช้ PostgreSQL 13
- มี healthcheck เพื่อให้แน่ใจว่า database พร้อมใช้งาน

### kong-migrations
- รัน database migration เพียงครั้งเดียวตอนเริ่มต้น
- สร้าง schema และ tables ที่จำเป็น

### kong
- Kong API Gateway หลัก
- Port 8000: Proxy HTTP
- Port 8443: Proxy HTTPS
- Port 8001: Admin API HTTP
- Port 8002: Kong Manager GUI

### konga
- Web-based Admin GUI สำหรับ Kong
- ใช้ Port 1337
- เชื่อมต่อกับ Kong ผ่าน Admin API