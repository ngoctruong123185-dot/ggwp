# HiHSK Local - Nền Tảng Tự Học Tiếng Trung HSK 1–6 (Chạy Cục Bộ 100%)

Ứng dụng web học tiếng Trung theo chuẩn HSK (1–6) chạy hoàn toàn **Offline/Local** trên máy tính cá nhân, tái hiện đầy đủ cấu trúc và luồng trải nghiệm học tập lấy cảm hứng từ HiHSK.com.

---

## 🌟 Các tính năng nổi bật

1. **Giáo trình 6 cấp độ HSK (1–6)**: Cấu trúc bài học theo chuẩn HSK, lộ trình rõ ràng, bài tập ôn tập tổng hợp cứ mỗi 3 bài học.
2. **Kho từ vựng & 11 dạng bài tập tương tác**:
   - Flashcard (Spaced Repetition / Leitner)
   - Quiz Đúng / Sai (với hình ảnh minh họa)
   - Quiz Đúng / Sai (với ngữ cảnh câu)
   - Nghe câu chọn hình (Web Speech API)
   - Điền từ vào chỗ trống
   - Ghép cặp từ vựng & nghĩa tương ứng
   - Sắp xếp trật tự câu đúng ngữ pháp
   - Nhớ nhanh từ vựng (Visual flash memory)
   - Nhận diện bộ thủ cấu thành chữ Hán
   - Luyện thứ tự nét chuẩn thư pháp (HanziWriter)
   - Kiểm tra tổng hợp trộn các dạng câu hỏi
3. **Luyện viết chữ Hán tương tác (HanziWriter)**:
   - Hiển thị lưới điền từ Tianzige (田字格)
   - Xem chuyển động nét mẫu
   - Chế độ tự vẽ và chấm điểm trực tiếp trên canvas / chuột / màn hình cảm ứng
   - Thanh trượt điều chỉnh gợi ý nét sau N lần sai (1–5 lần)
4. **214 Bộ thủ Khang Hy**:
   - Phân loại theo 7 chủ đề trực quan (Con người, Thiên nhiên, Động vật, Hành động...)
   - Bộ lọc chủ đề và trắc nghiệm nhận diện bộ thủ tức thì
5. **Chép chính tả qua video (Dictation Arena)**:
   - Nhúng YouTube video của người bản xứ
   - Tua từng câu theo mốc thời gian (startSec / endSec)
   - Ô gõ lại câu tiếng Trung, so khớp thông minh (bỏ qua dấu câu / khoảng trắng) và tính điểm
6. **Thi thử mô phỏng HSK**:
   - Đề thi 15 câu hỏi tổng hợp sinh ngẫu nhiên từ cơ sở dữ liệu
   - Đồng hồ đếm ngược 15 phút, tính điểm đỗ HSK (≥ 60%) và phân tích chi tiết câu sai
7. **Từ điển & Dịch offline**:
   - Tra cứu chéo chữ Hán, Pinyin, nghĩa tiếng Việt ngay trên SQLite local
8. **Bảng tiến độ học & Streak**:
   - Ghi nhận số từ đã thuộc, đang học, chưa học và chuỗi ngày học liên tục (Streak 🔥)
9. **Cài đặt & Quản trị**:
   - Tùy chọn giọng đọc Web Speech API, tốc độ đọc (0.7x – 1.0x)
   - Form thêm nhanh video Dictation và từ vựng mới tại `/admin`

---

## 🎨 Giao diện

Theme thể thao tối "Stadium Night" là mặc định, có nút chuyển sang giao diện sáng ở thanh tiêu đề. Font chữ được đóng gói cục bộ nên vẫn chạy offline. Chi tiết token màu, phông chữ và lớp CSS dùng lại xem mục 12 trong `PROJECT_MANUAL.md`.

## 🚀 Hướng dẫn cài đặt và chạy trên máy

### Yêu cầu:
- Đã cài Node.js (v18+ hoặc v20+). Bản Node portable đã được tự động thiết lập sẵn tại `D:\nodejs`.

### 1. Khởi chạy ứng dụng:
Mở PowerShell hoặc Command Prompt tại thư mục dự án và chạy:

```bash
npm install        # lần đầu hoặc sau khi cập nhật mã nguồn (tự chạy prisma generate)
npx prisma db push # đồng bộ cấu trúc bảng nếu schema thay đổi
npm run dev
```

Sau đó mở trình duyệt và truy cập: **http://localhost:3000**

**Cách nhanh nhất trên Windows:** nhấp đúp `start-hihsk.cmd`. File này tự cài gói, tạo khóa bí mật đăng nhập (`.env.local`), đồng bộ cơ sở dữ liệu, nạp dữ liệu bài học nếu là máy mới, rồi chạy máy chủ.

### Tải dự án từ GitHub về máy khác

Cơ sở dữ liệu `prisma/dev.db` không được đưa lên GitHub (vì chứa tài khoản và tiến độ học). Trên máy mới:

```cmd
git clone <địa-chỉ-repo>
cd <thư-mục-repo>
npm install
copy .env.example .env.local
npx prisma db push
npm run db:seed
npm run dev
```

Sau lệnh `copy`, mở `.env.local` và thay `JWT_SECRET` bằng một chuỗi ngẫu nhiên dài.

Hoặc chỉ cần nhấp đúp `start-hihsk.cmd`, file này làm tất cả các bước trên.

Nếu truy cập từ điện thoại hoặc thiết bị khác trong cùng mạng WiFi / LAN:
- Tìm địa chỉ IPv4 máy tính (chạy lệnh `ipconfig`)
- Truy cập từ thiết bị khác: `http://<dia-chi-ip>:3000`

---

## 🔐 Hệ thống Tài khoản & Đăng nhập (Global Auth)

Ứng dụng hỗ trợ đăng ký và đăng nhập đa người dùng hoàn toàn cục bộ (offline):
- Mật khẩu mã hoá an toàn chuẩn **bcrypt**.
- Quản lý phiên bằng **JWT (HttpOnly Cookie)**, bảo vệ toàn bộ route qua Middleware.
- Mỗi tài khoản lưu tiến độ học tập, chuỗi ngày streak riêng biệt.

### Tài khoản mẫu có sẵn trong hệ thống:
| Loại tài khoản | Tên đăng nhập | Mật khẩu | Quyền hạn |
|---|---|---|---|
| **Quản trị viên** | `admin` | `admin123` | Toàn quyền, truy cập trang Quản trị `/admin` |
| **Học viên mẫu** | `hocvien` | `123456` | Học tập, lưu tiến độ, luyện đề |

*(Bạn cũng có thể tự bấm **"Tạo tài khoản mới"** tại `/register` bất cứ lúc nào!)*

---

## 🗄️ Quản lý Cơ sở dữ liệu SQLite

Cơ sở dữ liệu SQLite được lưu trữ tại file cục bộ: `prisma/dev.db`.

- **Xem và chỉnh sửa cấu trúc bảng**: `prisma/schema.prisma`
- **Đồng bộ bảng vào SQLite**: `npx prisma db push`
- **Nạp lại nội dung học (giữ nguyên tài khoản)**: `npm run db:seed`
- **Xóa sạch tài khoản & tiến độ, tạo lại tài khoản mẫu**: `npm run db:seed:reset`
- **Dữ liệu nguồn**: `prisma/data/` (HSK 1, HSK 2, 214 bộ thủ, 345 chữ Hán, video chép chính tả)
- **Giao diện trực quan xem dữ liệu (Prisma Studio)**:
  ```bash
  npx prisma studio
  ```

---

## ➕ Cách thêm nội dung học tập mới

Bạn có thể thêm từ vựng hoặc video chép chính tả mới bằng 2 cách:

1. **Qua giao diện Web Admin**:
   - Truy cập **http://localhost:3000/admin**
   - Chọn tab **Thêm Video Chép chính tả** (dán ID YouTube và transcript JSON)
   - Hoặc chọn tab **Thêm Từ vựng vào bài học** và điền biểu mẫu.

2. **Qua các file dữ liệu trong `prisma/data/`**:
   - Thêm từ vựng vào `hsk1-full.js` / `hsk2-full.js`, video vào `dictations.js`, rồi chạy `npm run db:seed` (tài khoản và tiến độ được giữ nguyên).

---

## 🔊 Giọng đọc Web Speech API (TTS)

Toàn bộ tính năng phát âm sử dụng Web Speech API tích hợp sẵn của hệ điều hành / trình duyệt (Google Chrome, Edge):
- Tự động nhận diện giọng tiếng Trung giản thể (`zh-CN`).
- Trên Windows 10/11, bạn có thể vào `Settings > Time & Language > Speech` để thêm gói giọng đọc **Chinese (Simplified, China)** nếu cần chất lượng âm thanh cao nhất.

---

*Dự án xây dựng phục vụ mục đích học tập cá nhân phi thương mại.*
