# 📘 SỔ TAY TOÀN TẬP DỰ ÁN HIHSK LOCAL
> **Tài liệu hướng dẫn kỹ thuật, kiến trúc và vận hành dành cho người dùng & lập trình viên**  
> *Phiên bản:* 1.3.0 | *Cập nhật:* 15/10/2026 | *Môi trường:* Local Server (Node.js + SQLite)

---

## 📑 MỤC LỤC
1. [Tổng quan Dự án](#1-tổng-quan-dự-án)
2. [Ngăn xếp Công nghệ (Tech Stack)](#2-ngăn-xếp-công-nghệ-tech-stack)
3. [Cấu trúc Thư mục Dự án](#3-cấu-trúc-thư-mục-dự-án)
4. [Cơ sở dữ liệu SQLite & Prisma Schema](#4-cơ-sở-dữ-liệu-sqlite--prisma-schema)
5. [Hệ thống Xác thực Toàn cục (Global Authentication)](#5-hệ-thống-xác-thực-toàn-cục-global-authentication)
6. [Sơ đồ Tuyến đường (Routes) & Chức năng](#6-sơ-đồ-tuyến-đường-routes--chức-năng)
7. [11 Dạng Bài tập Tương tác Cốt lõi](#7-11-dạng-bài-tập-tương-tác-cốt-lõi)
8. [Trang Quản trị viên & Kiểm tra Học viên (/admin)](#8-trang-quản-trị-viên--kiểm-tra-học-viên-admin)
9. [Hướng dẫn Khởi chạy & Kết nối Mạng LAN / WiFi](#9-hướng-dẫn-khởi-chạy--kết-nối-mạng-lan--wifi)
10. [Bảo trì Cơ sở dữ liệu & Prisma Studio](#10-bảo-trì-cơ-sở-dữ-liệu--prisma-studio)
11. [Khắc phục Sự cố Thường gặp (Troubleshooting)](#11-khắc-phục-sự-cố-thường-gặp-troubleshooting)
12. [Hệ thống Giao diện "Stadium Night"](#12-hệ-thống-giao-diện-stadium-night)
13. [Nhật ký Thay đổi](#13-nhật-ký-thay-đổi)

---

## 1. TỔNG QUAN DỰ ÁN
**HiHSK Local** là nền tảng web tự học và luyện thi tiếng Trung HSK (cấp độ 1–6) chạy **100% Cục bộ (Offline)** trên máy tính cá nhân. Dự án tái hiện trọn vẹn luồng học tập lấy cảm hứng từ nền tảng *HiHSK.com*, nhưng loại bỏ hoàn toàn sự phụ thuộc vào cloud bên ngoài, dịch vụ trả phí hay API có phí.

### Điểm nổi bật:
- 🚀 **Tốc độ cực nhanh**: Chạy trên máy chủ cục bộ, cơ sở dữ liệu SQLite tại chỗ.
- 🔒 **Bảo mật & Riêng tư**: Toàn bộ tài khoản, mật khẩu, tiến độ học tập lưu trữ trên máy bạn.
- 📱 **Hỗ trợ Đa thiết bị trong LAN**: Điện thoại, máy tính bảng cùng mạng WiFi có thể truy cập mượt mà.
- 🔊 **Phát âm Web Speech API**: Sử dụng trực tiếp giọng đọc chuẩn tiếng Trung (`zh-CN`) tích hợp sẵn trên trình duyệt.
- ✍️ **Luyện viết chữ Hán SVG**: Công nghệ Canvas & Tianzige (田字格) nhận diện thứ tự nét chuẩn.

---

## 2. NGĂN XẾP CÔNG NGHỆ (TECH STACK)

| Thành phần | Công nghệ / Thư viện | Vai trò |
|---|---|---|
| **Framework** | **Next.js 14 (App Router)** | Render Server/Client components, dynamic routing, Route Handlers |
| **Ngôn ngữ** | **TypeScript 5.6** | Đảm bảo tính nhất quán kiểu dữ liệu và an toàn mã nguồn |
| **Styling** | **Tailwind CSS 3.4** | Thiết kế giao diện hiện đại, responsive, màu sắc đồng bộ |
| **Cơ sở dữ liệu** | **SQLite (`prisma/dev.db`)** | Lưu trữ toàn bộ dữ liệu từ điển, bài học, người dùng và tiến độ |
| **ORM** | **Prisma 5.22** | Quản lý schema, migrations, truy vấn dữ liệu an toàn |
| **Bảo mật & Auth** | **bcryptjs + jose (JWT)** | Mã hóa mật khẩu 1 chiều, tạo & xác thực token qua HttpOnly Cookie |
| **Luyện viết chữ** | **hanzi-writer** | Diễn hoạt nét viết chữ Hán, tạo bài kiểm tra vẽ nét tương tác |
| **Xử lý Pinyin** | **pinyin-pro** | Tách âm, chuẩn hóa thanh điệu pinyin tiếng Trung |
| **Hiệu ứng** | **canvas-confetti** | Pháo hoa chúc mừng khi hoàn thành bài tập |
| **Biểu tượng** | **lucide-react** | Bộ icon giao diện hiện đại |
| **Font chữ** | **@fontsource/barlow, @fontsource/barlow-condensed** | Font thể thao có dấu tiếng Việt, đóng gói cục bộ (chạy offline) |

---

## 3. CẤU TRÚC THƯ MỤC DỰ ÁN

```
d:/csd202/
├── prisma/
│   ├── dev.db                 # File cơ sở dữ liệu SQLite cục bộ
│   ├── schema.prisma          # Định nghĩa cấu trúc 12 bảng dữ liệu
│   ├── seed.js                # Nạp nội dung học (giữ nguyên tài khoản)
│   └── data/
│       ├── hsk1-full.js       # 15 bài · 150 từ · 15 ngữ pháp HSK 1
│       ├── hsk2-full.js       # 15 bài · 150 từ · 16 ngữ pháp HSK 2
│       ├── radicals.js        # 7 chủ đề · 214 bộ thủ Khang Hy
│       ├── characters.js      # 345 chữ Hán: số nét, bộ thủ, từ ghép
│       ├── dictations.js      # Video chép chính tả
│       └── emoji-image.js     # Ảnh minh họa SVG cục bộ từ emoji
├── src/
│   ├── app/                   # Next.js App Router (Giao diện & API)
│   │   ├── (auth)/
│   │   │   ├── login/         # Trang đăng nhập (/login)
│   │   │   └── register/      # Trang đăng ký học viên mới (/register)
│   │   ├── admin/             # Bảng điều khiển Quản trị viên (/admin)
│   │   │   ├── page.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── UserManagement.tsx # Bảng kiểm tra tài khoản học viên
│   │   │   └── AdminForm.tsx      # Form thêm từ vựng/video
│   │   ├── api/               # Tuyến đường API Backend
│   │   │   ├── auth/          # /api/auth (login, register, logout, me)
│   │   │   ├── admin/         # /api/admin (thao tác người dùng, thêm nội dung)
│   │   │   ├── progress/      # /api/progress (lưu & lấy tiến độ học)
│   │   │   ├── stats/         # /api/stats (thống kê trang chủ)
│   │   │   └── search/        # /api/search (tra cứu từ điển)
│   │   ├── dictation/         # Luyện chép chính tả qua video YouTube
│   │   ├── exam/              # Luyện thi thử mô phỏng HSK có bấm giờ
│   │   ├── hsk/               # Cây bài học các cấp độ HSK 1 - 6
│   │   ├── progress/          # Dashboard xem tiến độ & chuỗi streak
│   │   ├── radicals/          # 214 Bộ thủ Khang Hy theo 7 chủ đề
│   │   ├── settings/          # Cài đặt âm thanh, tốc độ đọc Web Speech API
│   │   ├── translate/         # Tra từ & dịch câu offline
│   │   ├── vocabulary/        # Không gian học từ vựng trung tâm & bài tập
│   │   ├── write/             # Tập viết chữ Hán trên lưới Tianzige
│   │   ├── layout.tsx         # Root Layout (font, theme, AuthProvider, Header, Footer)
│   │   ├── template.tsx       # Hiệu ứng chuyển trang (vệt cam + trồi lên)
│   │   └── page.tsx           # Trang chủ Landing page
│   ├── components/
│   │   ├── audio/             # Nút phát âm Web Speech API, thanh nghe liên tục
│   │   ├── auth/              # AuthProvider (Context & useAuth), AuthShell (khung đăng nhập/đăng ký)
│   │   ├── home/              # HeroTrainer (chữ 练 tự viết từng nét trên trang chủ)
│   │   ├── exercises/         # 11 component bài tập tương tác
│   │   ├── layout/            # Header, Footer, LessonSidebar, ThemeToggle
│   │   └── writing/           # Canvas tập viết HanziWriter
│   ├── lib/
│   │   ├── auth.ts            # Hàm hash mật khẩu (bcrypt) & session
│   │   ├── jwt.ts             # Tạo & xác thực JWT Token (jose)
│   │   ├── prisma.ts          # Singleton Prisma Client
│   │   ├── speech.ts          # Web Speech API helpers
│   │   └── utils.ts           # Hàm tiện ích cn (clsx + tailwind-merge)
│   └── middleware.ts          # Middleware bảo vệ route & phân quyền Admin
├── package.json               # Cấu hình dự án & scripts khởi chạy
├── tailwind.config.ts         # Cấu hình màu sắc giao diện Tailwind
├── tsconfig.json              # Cấu hình TypeScript ES2022
├── README.md                  # Hướng dẫn cơ bản
└── PROJECT_MANUAL.md          # TÀI LIỆU TOÀN TẬP NÀY
```

---

## 4. CƠ SỞ DỮ LIỆU SQLITE & PRISMA SCHEMA

Toàn bộ database nằm tại file: **`d:\csd202\prisma\dev.db`**. Cấu trúc gồm **12 Models**:

### 1. Quản lý Người dùng & Tiến độ
- **`User`**:
  - `id` (String - UUID, Khóa chính)
  - `username` (String - Duy nhất)
  - `passwordHash` (String - Băm bcrypt an toàn)
  - `displayName` (String - Tên hiển thị)
  - `role` (String - Mặc định `"USER"`, có thể là `"ADMIN"`)
  - `createdAt` (DateTime)
  - Quan hệ: `progress: UserProgress[]`, `streak: UserStreak?`
- **`UserProgress`**:
  - `id` (String - UUID)
  - `userId` (String - Khóa ngoại tới `User.id`, `onDelete: Cascade`)
  - `itemType` (String - `"vocab"` | `"lesson"` | `"radical"` | `"dictation"`)
  - `itemId` (String - ID mục tiêu tương ứng)
  - `status` (String - `"not_started"` | `"in_progress"` | `"done"`)
  - `score` (Int - Điểm số từ 0 - 100)
  - `updatedAt` (DateTime)
  - Ràng buộc: `@@unique([userId, itemType, itemId])` (Mỗi học viên có 1 trạng thái duy nhất trên 1 mục)
- **`UserStreak`**:
  - `userId` (String - Khóa chính & Khóa ngoại tới `User.id`)
  - `currentStreak` (Int - Số ngày học liên tục)
  - `lastActiveDate` (String - `YYYY-MM-DD`)

### 2. Giáo trình & Nội dung Học
- **`Level`**: 6 cấp độ (`hsk1` đến `hsk6`), thứ tự, mô tả.
- **`Lesson`**: Các bài học thuộc cấp độ, tiêu đề chữ Hán (`title`) và nghĩa Việt (`titleVi`).
- **`VocabItem`**: Từ vựng thuộc bài học, `hanzi`, `pinyin`, `imageUrl`, câu ví dụ (`exampleSentence`, `exampleSentenceVi`).
- **`Meaning`**: Nghĩa của từ vựng, từ loại (`wordClass`), nghĩa tiếng Việt (`meaningVi`).
- **`Grammar`**: Ngữ pháp theo từng bài, giải thích, các câu ví dụ mẫu định dạng JSON.
- **`RadicalTheme`**: 7 chủ đề bộ thủ Khang Hy (Con người, Thiên nhiên, Động thực vật, Hành động...).
- **`Radical`**: Chi tiết 214 bộ thủ: `number` (số thứ tự Khang Hy 1–214), `hanzi`, `variant` (dạng biến thể như 亻, 氵, 讠 hoặc dạng phồn thể như 門), số nét, pinyin, nghĩa Hán Việt.
- **`CharacterDetail`**: Thông tin tra cứu ký tự, bộ thủ cấu thành, danh sách từ ghép JSON.
- **`DictationVideo`**: Video YouTube bài nghe, cấp độ, transcript từng câu đồng bộ giây JSON.

### 3. Nội dung hiện có trong cơ sở dữ liệu (v1.3.0)

| Cấp độ | Bài học | Từ vựng | Ngữ pháp | Trạng thái |
|---|---|---|---|---|
| HSK 1 | 15 | 150 | 15 | Hoàn chỉnh |
| HSK 2 | 15 | 150 | 16 | Hoàn chỉnh (150 từ mới, cộng dồn 300 từ) |
| HSK 3 – 6 | 0 | 0 | 0 | Chưa có nội dung, hiển thị "Sắp mở" |

| Dữ liệu khác | Số lượng |
|---|---|
| Bộ thủ Khang Hy | 214 (đủ bộ), chia 7 chủ đề |
| Chữ Hán có thông tin chi tiết | 345 (mọi chữ xuất hiện trong từ vựng HSK 1–2) |
| Video chép chính tả | 3 |

> Danh sách HSK 1 của dự án đã có sẵn 您, 日, 好吃, 说话, 吧 (vốn thuộc HSK 2), vì vậy HSK 2 bổ sung 5 từ HSK 1 chính thức còn thiếu (有, 来, 几, 岁, 衣服) để tổng 300 từ khớp chuẩn HSK 1 + HSK 2.
> Ảnh minh họa HSK 2 là emoji được vẽ thành SVG ngay trong cơ sở dữ liệu, nên hiển thị được cả khi không có mạng.

---

## 5. HỆ THỐNG XÁC THỰC TOÀN CỤC (GLOBAL AUTHENTICATION)

### Cơ chế hoạt động:
1. **Bảo mật Mật khẩu**: Mật khẩu học viên được băm với độ an toàn cao (`bcryptjs`, 10 vòng salt) trước khi lưu vào SQLite. Không bao giờ lưu mật khẩu dạng văn bản thô.
2. **Quản lý Phiên (Session)**: Sau khi đăng nhập thành công, máy chủ cấp JWT token được ký an toàn bởi secret key nội bộ và gửi về qua cookie **`hihsk_token`** (cờ `httpOnly: true`, `sameSite: 'lax'`, thời hạn 30 ngày).
3. **Bộ lọc Tuyến đường (`src/middleware.ts`)**:
   - Khi chưa đăng nhập: Mọi yêu cầu truy cập các trang học tập đều bị chuyển hướng về `/login?redirect=<url-muon-vao>`.
   - Khi đã đăng nhập: Nếu truy cập vào `/login` hoặc `/register`, tự động chuyển về `/`.
   - Trang `/admin`: Chỉ cho phép người dùng có `role === "ADMIN"` truy cập. Người dùng thường sẽ bị đẩy về trang chủ.
4. **Cô lập Tiến độ Đa người dùng**: Mọi thao tác lưu điểm, tính từ vựng đã học, chuỗi ngày streak đều gắn liền với `userId` từ token phiên, đảm bảo mỗi người dùng có không gian học tập hoàn toàn độc lập.

### Tài khoản Mặc định có sẵn:
| Loại tài khoản | Tên đăng nhập | Mật khẩu | Quyền hạn | Mục đích sử dụng |
|---|---|---|---|---|
| **Quản trị viên** | `admin` | `admin123` | `ADMIN` | Quản trị học viên, đổi mật khẩu, thêm từ vựng/video |
| **Học viên Demo** | `hocvien` | `123456` | `USER` | Học tập trải nghiệm ngay, có sẵn 5 ngày streak |

*(Có thể tạo thêm vô số tài khoản học viên mới tại trang `/register`)*

---

## 6. SƠ ĐỒ TUYẾN ĐƯỜNG (ROUTES) & CHỨC NĂNG

| Tuyến đường | Loại | Chức năng chi tiết |
|---|---|---|
| `/` | Page | **Trang chủ**: Thống kê số lượng bài, từ vựng thực tế từ DB; danh mục 11 khối tính năng cốt lõi. |
| `/login` | Page | **Đăng nhập**: Form đăng nhập với nút điền nhanh tài khoản mẫu. |
| `/register` | Page | **Đăng ký**: Tạo tài khoản học viên mới và tự động khởi tạo chuỗi ngày học. |
| `/hsk` | Page | **Giáo trình HSK**: Thẻ tổng quan 6 cấp độ HSK 1 đến 6. |
| `/hsk/[levelId]` | Page | **Cây bài học**: Danh sách bài học theo cấp độ kèm % tiến độ hoàn thành. |
| `/vocabulary/[lessonId]` | Page | **Không gian học từ vựng**: Sidebar bài học thu gọn, phát tất cả từ vựng liên tục, chuyển đổi giữa Từ vựng, 11 bài tập và Ngữ pháp. |
| `/write/[hanzi]` | Page | **Luyện viết chữ Hán**: Khung lưới Tianzige, xem mẫu nét chuyển động, vẽ tự do chấm điểm nét chuẩn, thanh trượt gợi ý sau N lần sai. |
| `/character/[id]` | Page | **Tra cứu ký tự**: Số nét, bộ thủ cấu thành, danh sách các từ ghép có phát âm thanh. |
| `/radicals` | Page | **214 Bộ thủ Khang Hy**: Khám phá bộ thủ theo 7 chủ đề trực quan kèm trắc nghiệm nhận diện. |
| `/dictation` | Page | **Chép chính tả Video**: Danh sách video luyện nghe kèm bộ lọc cấp độ HSK. |
| `/dictation/[videoId]` | Page | **Trình nghe chép chính tả**: Nhúng video YouTube, tua tự động theo câu transcript, ô gõ đối chiếu thông minh bỏ qua dấu câu. |
| `/exam/[levelId]` | Page | **Thi thử mô phỏng HSK**: 15 câu trắc nghiệm ngẫu nhiên từ DB, đồng hồ đếm ngược 15 phút, tính điểm đỗ HSK (≥ 60%). |
| `/translate` | Page | **Từ điển Offline**: Tra chéo Hán tự, Pinyin và nghĩa Việt không cần kết nối mạng. |
| `/progress` | Page | **Bảng tiến độ & Streak**: Chuỗi ngày học liên tục (🔥), tỷ lệ từ đã thuộc, đang học, chưa học. |
| `/settings` | Page | **Cài đặt**: Chọn giọng đọc Web Speech API (`zh-CN`), tốc độ đọc (0.7x - 1.0x), gợi ý viết chữ. |
| `/admin` | Page | **Quản trị viên**: Quản lý học viên, đặt lại mật khẩu, phân quyền và thêm từ vựng/video mới. |

---

## 7. 11 DẠNG BÀI TẬP TƯƠNG TÁC CỐT LÕI

Nằm tại thư mục `src/components/exercises/`, tích hợp trực tiếp trong mỗi bài học từ vựng:

1. **Flashcard (Lật thẻ nhớ)**: Lật mặt chữ Hán sang Pinyin & nghĩa Việt; phân loại "Chưa nhớ" (Spaced Repetition) và "Đã nhớ".
2. **True/False Hình ảnh**: Ghép chữ Hán với ảnh minh họa ngẫu nhiên; chọn Đúng hoặc Sai.
3. **True/False Ngữ cảnh**: Đọc câu ví dụ tiếng Trung và xác định nghĩa của từ trong câu.
4. **Điền từ vào chỗ trống**: Câu văn khuyết từ vựng; chọn 1 trong 4 đáp án đúng nhất.
5. **Nghe câu chọn hình**: Trình duyệt phát âm câu mẫu qua Web Speech API; học viên bấm chọn đúng hình ảnh minh họa.
6. **Sắp xếp trật tự câu**: Bấm các khối từ rời rạc để xếp thành câu hoàn chỉnh đúng ngữ pháp.
7. **Ghép cặp từ & nghĩa**: Nối tương ứng giữa 5 chữ Hán và 5 nghĩa tiếng Việt.
8. **Nhớ nhanh từ vựng**: Chữ Hán xuất hiện trong 2.5 giây rồi biến mất; kiểm tra trí nhớ tức thì.
9. **Nhận diện bộ thủ**: Chọn bộ thủ chính cấu thành nên chữ Hán đang học.
10. **Luyện viết nét thư pháp**: Vẽ trực tiếp từng nét trên canvas theo quy chuẩn nét bút thuận.
11. **Kiểm tra tổng hợp**: Trộn ngẫu nhiên các dạng câu hỏi để đánh giá toàn diện bài học.

---

## 8. TRANG QUẢN TRỊ VIÊN & KIỂM TRA HỌC VIÊN (/admin)

Dành riêng cho tài khoản có vai trò `ADMIN`. Gồm 2 phân hệ chính:

### Phân hệ 1: Bảng Kiểm tra & Quản lý Tài khoản (User Inspector)
- **4 Thẻ thống kê**: Tổng tài khoản, Tổng học viên, Số quản trị viên, Kỷ lục chuỗi ngày Streak 🔥.
- **Tìm kiếm & Lọc**: Gõ tìm theo tên hoặc username; lọc nhanh theo vai trò.
- **Bảng học viên đầy đủ**:
  - Tên, Avatar, Username, nhãn "Bạn" đánh dấu tài khoản đang thao tác.
  - Vai trò (Admin / Học viên).
  - Chuỗi ngày Streak và ngày học gần nhất.
  - Số lượng từ vựng đã thuộc, số từ đang ôn luyện, số bài học đã làm.
  - Ngày đăng ký tài khoản.
- **5 Thao tác trực tiếp**:
  1. 👁️ **Xem chi tiết tiến độ**: Mở bảng Modal liệt kê chi tiết từng từ vựng, bài học học viên đã làm cùng mốc thời gian và điểm số.
  2. 🔑 **Đặt lại mật khẩu**: Đổi mật khẩu mới cho học viên ngay lập tức.
  3. 🛡️ **Thay đổi quyền hạn**: Chuyển đổi qua lại giữa Học viên và Quản trị viên (có chống tự hạ quyền).
  4. 🗑️ **Xóa tài khoản**: Xóa học viên và tự động cascade xóa sạch tiến độ học của người đó trong SQLite.
  5. ➕ **Thêm tài khoản**: Nút tạo nhanh học viên/quản trị viên mới trực tiếp.

### Phân hệ 2: Thêm Nội dung Bài học (Content Manager)
- **Thêm video chép chính tả**: Nhập YouTube ID, tiêu đề, cấp độ, dán transcript câu dạng JSON có mốc thời gian bắt đầu/kết thúc (`startSec`/`endSec`).
- **Thêm từ vựng mới**: Chọn bài học, nhập Hán tự, Pinyin, từ loại, nghĩa tiếng Việt và câu ví dụ minh họa.

---

## 9. HƯỚNG DẪN KHỞI CHẠY & KẾT NỐI MẠNG LAN / WIFI

### 1. Khởi chạy trên máy tính này
Mở PowerShell tại thư mục dự án `d:\csd202` và chạy:
```powershell
$env:Path = "$env:Path;D:\nodejs"
npm run dev
```
Sau đó mở trình duyệt truy cập:
👉 **http://localhost:3000**

---

### 2. Kết nối từ Điện thoại / Máy tính bảng cùng mạng WiFi
Máy chủ đã được cấu hình tự động lắng nghe trên mọi địa chỉ mạng (`-H 0.0.0.0`).

1. **Lấy địa chỉ IP máy tính**:
   Mở PowerShell và gõ:
   ```powershell
   ipconfig
   ```
   Tìm dòng `IPv4 Address` ở mục `Wireless LAN adapter Wi-Fi`.  
   *(Ví dụ IP hiện tại của máy bạn: **`10.13.18.0`**)*

2. **Mở từ thiết bị khác**:
   Trên điện thoại hoặc tablet kết nối chung Wi-Fi, mở trình duyệt vào:
   👉 **`http://<IP-may-tinh>:3000`** *(Ví dụ: `http://10.13.18.0:3000`)*

3. **Mở quyền Tường lửa Windows (Nếu điện thoại không kết nối được)**:
   Nếu điện thoại bị xoay vòng hoặc báo lỗi mạng, nguyên nhân do Windows Firewall chặn cổng 3000. Bạn chỉ cần mở PowerShell (Run as Administrator) và chạy lệnh:
   ```powershell
   New-NetFirewallRule -DisplayName "HiHSK Local Port 3000" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
   ```

---

## 10. BẢO TRÌ CƠ SỞ DỮ LIỆU & PRISMA STUDIO

### 1. Xem dữ liệu dạng bảng Excel trực quan (Prisma Studio)
Mở một cửa sổ PowerShell mới và gõ:
```powershell
$env:Path = "$env:Path;D:\nodejs"
npx prisma studio
```
Truy cập: **http://localhost:5555**  
Bạn có thể xem, chỉnh sửa, lọc và xóa dữ liệu trực tiếp trên toàn bộ 12 bảng trong SQLite.

### 2. Đồng bộ khi sửa đổi cấu trúc bảng
Nếu bạn thêm trường mới vào `prisma/schema.prisma`:
```powershell
npx prisma db push
```

### 3. Nạp lại dữ liệu bài học (Seed Data)
Làm mới toàn bộ nội dung học (cấp độ, bài học, từ vựng, ngữ pháp, bộ thủ, chữ Hán, video). **Tài khoản và tiến độ học được giữ nguyên**; tiến độ trỏ tới nội dung không còn tồn tại sẽ được dọn tự động:
```powershell
npm run db:seed
```
Muốn xóa sạch cả tài khoản lẫn tiến độ và tạo lại hai tài khoản mẫu:
```powershell
npm run db:seed:reset
```

### 4. Sau khi cập nhật mã nguồn (từ v1.3.0)
`schema.prisma` có thêm cột `number` và `variant` cho bảng `Radical`, và dự án có thêm font cục bộ. Tắt `npm run dev` rồi chạy:
```powershell
npm install
npx prisma db push
```
`npm install` tự chạy `prisma generate` (script `postinstall`). Nếu bạn dùng file `dev.db` đi kèm bản cập nhật thì `db push` sẽ báo đã đồng bộ.

---

## 11. KHẮC PHỤC SỰ CỐ THƯỜNG GẶP (TROUBLESHOOTING)

### Lỗi 1: `npm : File ... npm.ps1 cannot be loaded because running scripts is disabled`
- **Nguyên nhân**: Chính sách bảo mật ExecutionPolicy của PowerShell trên Windows chặn script `.ps1`.
- **Cách xử lý**: Dùng `npm.cmd` thay vì `npm`:
  ```powershell
  npm.cmd run dev
  ```
  Hoặc mở quyền một lần duy nhất:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

### Lỗi 2: Không tìm thấy lệnh `node` hoặc `npm`
- **Nguyên nhân**: Node.js được đặt tại thư mục di động `D:\nodejs`.
- **Cách xử lý**: Nạp biến môi trường trước khi chạy lệnh:
  ```powershell
  $env:Path = "$env:Path;D:\nodejs"
  ```

### Lỗi 3: Cổng 3000 đang bị chiếm dụng
- **Cách xử lý**: Tìm và tắt tiến trình đang chiếm cổng:
  ```powershell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
  ```
  Sau đó khởi động lại `npm run dev`.

### Lỗi 4: Không nghe thấy giọng phát âm tiếng Trung
- **Nguyên nhân**: Trình duyệt chưa tải kịp gói ngôn ngữ Web Speech API `zh-CN` hoặc đang tắt loa.
- **Cách xử lý**: Vào trang **[`/settings`](http://localhost:3000/settings)**, tại mục "Giọng đọc hệ thống", bấm thử giọng phát âm và chọn giọng Trung văn có sẵn trong danh sách của Windows (ví dụ: *Microsoft Huihui*, *Google Chinese*).

### Lỗi 5: `EPERM: operation not permitted ... query_engine-windows.dll.node`
- **Nguyên nhân**: `npm install` / `prisma generate` chạy trong lúc `npm run dev` vẫn đang mở, Windows khóa file engine.
- **Cách xử lý**: Tắt máy chủ dev (Ctrl + C) rồi chạy lại lệnh.

---

## 12. HỆ THỐNG GIAO DIỆN "STADIUM NIGHT"

Giao diện lấy cảm hứng từ thể thao: học tiếng Trung như một buổi tập. Chế độ **tối là mặc định**, có nút chuyển sang **sáng** ở thanh tiêu đề (lưu trong `localStorage`, khóa `hihsk-theme`).

### Màu sắc (token)
| Vai trò | Màu tối | Lớp Tailwind |
|---|---|---|
| Nền trang (sân vận động đêm) | `#0A1022` | `bg-night`, `bg-slate-50` |
| Thẻ nội dung | `#111A34` | `bg-surface`, `bg-white` |
| Hành động chính (cam blaze) | `#FF6A1A` | `bg-blue-500/600`, `text-blue-600` |
| Đúng / hoàn thành | `#22D69A` | `emerald-*` |
| Sai | `#FF4D6D` | `rose-*` |
| Chuỗi ngày, huy chương | `#FFC233` | `amber-*` |
| Màu áo thứ hai | `#8E80FF` | `violet-*` |

Toàn bộ bảng màu Tailwind (`slate`, `blue`, `emerald`…) được trỏ tới biến CSS trong `src/app/globals.css`, nên các lớp cũ như `bg-white` hay `text-slate-900` tự đổi theo theme. Chữ trên nền màu tươi dùng `text-onaccent` (mực tối) để đủ tương phản.

### Phông chữ
- **Barlow Condensed** nghiêng, đậm cho tiêu đề (`.headline`) và chữ số bảng điểm (`.num`).
- **Barlow** cho nội dung. Chữ Hán: `.hanzi-font` (Khải thư, dùng khi học) và `.hanzi-sans` (đậm, dùng để trang trí).

### Thành phần dùng lại
| Lớp CSS | Dùng cho |
|---|---|
| `.btn-blaze`, `.btn-ghost` | Nút hành động hình bình hành |
| `.banner` (+ `.banner-gold`, `.banner-go`, `.banner-foul`, `.banner-violet`) | Khối tiêu đề trang có vạch màu bên trái |
| `.track` + `.track-fill` | Thanh tiến độ dạng đường chạy, có hiệu ứng chạy dài khi tải |
| `.lanes`, `.stripes`, `.floodlight`, `.tianzige` | Họa tiết làn chạy, sọc áo, đèn sân, lưới 田字格 |

### Chuyển động
- Mỗi lần chuyển trang: một vệt cam quét qua mép trên và nội dung trồi lên (`app/template.tsx`).
- Trang chủ: chữ 练 tự viết từng nét kèm bộ đếm nét (`components/home/HeroTrainer.tsx`, dữ liệu nét nhúng sẵn, chạy offline).
- Nền trang chủ: đường chạy điền kinh phối cảnh vẽ bằng canvas (`components/home/TrackCanvas.tsx`), vạch cự ly chạy về phía người xem, vệt sáng "vận động viên" trên các làn. Cuộn trang thì đường chạy tăng tốc trong chốc lát, di chuột thì điểm tụ nghiêng theo. Tự dừng khi khuất màn hình hoặc tab ẩn.
- Màn hình đầu: tiêu đề trồi lên từng dòng, thẻ 练 lướt vào, gợi ý "Cuộn xuống" (lớp `.reveal-line`, `.rise-in`, `.card-in`).
- Cuộn trang: sáu làn HSK và các nhóm công cụ hiện dần khi cuộn tới, số làn "bật khỏi vạch xuất phát", thanh tiến độ chỉ chạy khi làn hiện ra (`components/home/ScrollReveal.tsx` + thuộc tính `data-reveal`, độ trễ theo biến `--i`).
- Bài tập: rung khi trả lời sai (`animate-shake`), bật nhẹ khi xuất hiện (`animate-scale-in`).
- Tất cả hiệu ứng tắt khi hệ điều hành bật "Giảm chuyển động" (`prefers-reduced-motion`).

---

## 13. NHẬT KÝ THAY ĐỔI

### v1.3.1 (15/10/2026)
- Trang chủ "điện ảnh": nền đường chạy động bằng canvas, màn hình đầu toàn khung với tiêu đề trồi lên từng dòng, hiệu ứng hiện dần khi cuộn cho sáu làn HSK và các nhóm công cụ. Tất cả chạy offline và tắt khi bật "Giảm chuyển động".

### v1.3.0 (15/10/2026)
- **Dữ liệu**: HSK 2 đủ 15 bài / 150 từ / 16 ngữ pháp (thay 3 bài tạm thời cũ); đủ 214 bộ thủ Khang Hy với số thứ tự và dạng biến thể; 345 chữ Hán có số nét, bộ thủ, từ ghép.
- **Seed**: không còn xóa tài khoản khi nạp lại nội dung; thêm `npm run db:seed:reset`.
- **Giao diện**: theme thể thao tối "Stadium Night", chế độ sáng tùy chọn, font cục bộ, trang chủ mới (chữ 练 tự viết, bảng điểm, sáu làn chạy HSK), trang giáo trình, kế hoạch bài học, bảng thành tích với nhật ký tập luyện, đăng nhập/đăng ký, thi thử có đồng hồ dính đầu trang.
- **Sửa lỗi**: thi thử HSK 3–6 không còn mở đề rỗng; nút "Quay lại" ở trang chữ Hán trở về đúng bài học; lớp phủ hộp thoại và khung video không còn bị sáng màu.

> **Còn lại cho phiên bản sau:** nội dung HSK 3 – 6; ID YouTube trong `prisma/data/dictations.js` hiện là dữ liệu mẫu, cần thay bằng video thật.
