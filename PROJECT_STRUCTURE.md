# 📂 CẤU TRÚC DỰ ÁN - TUTORLINK TVU

> **Tài liệu mô tả chi tiết cấu trúc thư mục và mục đích từng file**

---

## 📊 Tổng Quan

```
DOAN_CHUYENNGANG/
├── 📁 backend/           # Backend API (Node.js + Express + MySQL)
├── 📁 database/          # SQL files
├── 📁 src/              # Frontend (React + TypeScript)
├── 📁 docs/             # Documentation
├── 📁 public/           # Static assets
├── 📁 thesis/           # Tài liệu đồ án
├── 📄 .env              # Environment variables
├── 📄 package.json      # Dependencies
├── 📄 vite.config.ts    # Vite config
└── 📄 START.bat         # Quick start script
```

---

## 🔧 Backend Structure

```
backend/
├── config/
│   └── database.js              # MySQL connection config
│
├── controllers/                 # Business logic
│   ├── authController.js        # Đăng ký, đăng nhập, logout
│   ├── tutorController.js       # CRUD gia sư, lọc, tìm kiếm
│   ├── postController.js        # CRUD bài đăng
│   ├── applicationController.js # Ứng tuyển, chấp nhận, từ chối
│   └── adminController.js       # Xác thực gia sư, thống kê
│
├── middleware/
│   └── auth.js                  # JWT verification, role check
│
├── routes/                      # API routes
│   ├── authRoutes.js            # /api/auth/*
│   ├── tutorRoutes.js           # /api/tutors/*
│   ├── postRoutes.js            # /api/posts/*
│   ├── applicationRoutes.js     # /api/applications/*
│   └── adminRoutes.js           # /api/admin/*
│
├── Utility Scripts/             # Development tools
│   ├── quick-check.js           # ✅ Kiểm tra nhanh kết nối DB
│   ├── check-system.js          # ✅ Thống kê chi tiết hệ thống
│   ├── check-tables.js          # ✅ Xem cấu trúc bảng
│   ├── check-all-tables.js      # ✅ Xem dữ liệu mẫu từ các bảng
│   ├── clear-all-data.js        # ⚠️ Xóa toàn bộ data (giữ admin)
│   └── auto-setup-complete.js   # ✅ Tạo dữ liệu demo
│
├── server.js                    # 🚀 Entry point - Express server
├── README.md                    # Backend documentation
└── UTILITY_SCRIPTS.md           # Hướng dẫn dùng utility scripts
```

### Controller Details

**authController.js**
- `register()` - Đăng ký phụ huynh/gia sư
- `login()` - Đăng nhập (JWT token)
- `logout()` - Đăng xuất
- `getProfile()` - Lấy thông tin user

**tutorController.js**
- `getTutors()` - Danh sách gia sư (có filter)
- `getTutorById()` - Chi tiết gia sư
- `registerTutor()` - Đăng ký hồ sơ gia sư
- `updateProfile()` - Cập nhật hồ sơ

**postController.js**
- `getPosts()` - Danh sách bài đăng
- `getPostById()` - Chi tiết bài đăng
- `createPost()` - Tạo bài đăng
- `updatePost()` - Sửa bài đăng
- `deletePost()` - Xóa bài đăng

**applicationController.js**
- `getApplications()` - Danh sách đơn (theo user/post)
- `createApplication()` - Ứng tuyển bài đăng
- `acceptApplication()` - Chấp nhận đơn
- `rejectApplication()` - Từ chối đơn

**adminController.js**
- `getStats()` - Thống kê tổng quan
- `getAllUsers()` - Danh sách users
- `verifyTutor()` - Xác thực MSSV gia sư
- `getAllPosts()` - Quản lý bài đăng

---

## 🗄️ Database Structure

```
database/
└── tutorlink_complete.sql    # ⭐ FULL database (schema + data)
```

### Bảng trong database (8 bảng)

1. **nguoi_dung** - Users table
   - Admin, Phụ huynh, Gia sư
   - Thông tin: email, password (hashed), họ tên, vai trò

2. **ho_so_sinh_vien** - Student profiles
   - MSSV, mã lớp, khoa, ngành, năm học
   - Trạng thái xác thực

3. **ho_so_gia_su** - Tutor profiles
   - Liên kết với student profile
   - Giới thiệu, kinh nghiệm, học phí
   - `cap_do` (JSON array): ["Tiểu học", "THCS", "THPT"]
   - `ky_nang` (JSON array): Skills

4. **mon_hoc** - Subjects (10 môn)
   - Toán, Ngữ Văn, Tiếng Anh, Vật Lý, Hóa Học
   - Sinh Học, Lịch Sử, Địa Lý, Tin Học, GDCD

5. **gia_su_mon_hoc** - Tutor-Subject mapping (many-to-many)
   - Liên kết gia sư với môn học

6. **bai_dang** - Job posts from parents
   - Tiêu đề, mô ta, môn học, cấp độ
   - Địa điểm, học phí, trạng thái

7. **don_ung_tuyen** - Applications from tutors
   - Bài đăng ID, Gia sư ID
   - Lời nhắn, trạng thái (pending/accepted/rejected)

8. **danh_gia** - Reviews/Ratings
   - Gia sư ID, Người đánh giá ID
   - Điểm (1-5), nội dung

### Sample Data

- ✅ **1 Admin account**: admin@tutorlink.vn
- ✅ **20 Tutors**: 1101210001@st.tvu.edu.vn đến 1101210020@st.tvu.edu.vn
- ✅ **10 Subjects**: Full coverage grades 1-12
- ✅ **Trà Vinh locations**: TP. Trà Vinh, Càng Long, Tiểu Cần, Châu Thành
- ✅ **5 Sample posts**: Demo job postings

---

## ⚛️ Frontend Structure

```
src/
├── api/                      # API Client Layer
│   ├── axios.ts              # Axios instance + interceptors
│   ├── auth.api.ts           # Auth endpoints
│   ├── tutors.api.ts         # Tutors endpoints
│   ├── posts.api.ts          # Posts endpoints
│   ├── admin.api.ts          # Admin endpoints
│   └── index.ts              # Exports
│
├── components/               # Reusable React Components
│   ├── Navbar.tsx            # Navigation bar with auth
│   ├── Footer.tsx            # Footer
│   ├── SearchBar.tsx         # Search input with debounce
│   ├── FilterSidebar.tsx     # Tutor filters
│   ├── PostFilterSidebar.tsx # Post filters
│   ├── TutorCard.tsx         # Tutor display card
│   ├── PostCard.tsx          # Post display card
│   ├── Pagination.tsx        # Pagination component
│   ├── ProtectedRoute.tsx    # Auth guard for routes
│   ├── TutorRegistration.tsx # Multi-step form (4 steps)
│   └── ChatBox.tsx           # Chat interface (placeholder)
│
├── pages/                    # Page Components
│   ├── HomePage.tsx          # Landing page
│   ├── AuthPage.tsx          # Login/Register (2 tabs)
│   ├── TutorRegistrationPage.tsx  # Tutor signup
│   ├── TutorsListPage.tsx    # Browse tutors
│   ├── TutorDetailPage.tsx   # Tutor profile
│   ├── PostsListPage.tsx     # Browse posts
│   ├── PostDetailPage.tsx    # Post details
│   ├── CreatePostPage.tsx    # Create new post
│   ├── DashboardPage.tsx     # Main dashboard (role-based)
│   ├── ParentDashboard.tsx   # Parent dashboard
│   ├── TutorDashboard.tsx    # Tutor dashboard
│   ├── AdminDashboard.tsx    # Admin panel
│   ├── TutorProfilePage.tsx  # Tutor's own profile
│   ├── ChatPage.tsx          # Chat page (placeholder)
│   ├── AdminPanelPage.tsx    # Admin management
│   └── NotFoundPage.tsx      # 404 page
│
├── contexts/                 # React Context API
│   ├── AuthContext.tsx       # Auth state (user, token, logout)
│   ├── NotificationContext.tsx  # Toast notifications
│   └── index.ts
│
├── hooks/                    # Custom Hooks
│   ├── useAuth.ts            # Access auth context
│   ├── useFetch.ts           # Data fetching with loading/error
│   ├── useDebounce.ts        # Debounce value changes
│   ├── useForm.ts            # Form state management
│   ├── useLocalStorage.ts    # Persist to localStorage
│   ├── usePagination.ts      # Pagination logic
│   └── index.ts
│
├── layouts/
│   └── MainLayout.tsx        # Layout wrapper (Navbar + Footer)
│
├── config/                   # Configuration
│   ├── constants.ts          # Constants (roles, status, etc)
│   ├── env.ts                # Environment variables
│   ├── routes.ts             # Route paths + permissions
│   ├── api.config.ts         # API base URLs
│   └── index.ts
│
├── types/                    # TypeScript Types
│   └── index.ts              # All type definitions
│
├── utils/                    # Utility Functions
│   └── dataAdapter.ts        # Transform API responses
│
├── data/
│   └── mockData.ts           # Empty (legacy types only)
│
├── constants/
│   └── options.ts            # Select options (subjects, levels)
│
├── styles/                   # CSS Files
│   ├── design-system.css     # Colors, typography, spacing
│   ├── modern-app.css        # Global app styles
│   ├── modern-navbar.css     # Navbar styles
│   ├── tutor-card.css        # Tutor card (compact version)
│   ├── post-card.css         # Post card
│   ├── post-filter-sidebar.css
│   ├── filter-sidebar-compact.css
│   ├── auth-page-figma.css   # Auth page
│   ├── homepage-figma.css    # Homepage
│   ├── tutors-list-figma.css
│   ├── tutor-detail-figma.css
│   ├── posts-list-figma.css
│   ├── post-detail-figma.css
│   ├── cards.css             # Generic cards
│   ├── buttons.css           # Button variants
│   └── forms.css             # Form inputs
│
├── App.tsx                   # Main App component
├── App.css                   # App-specific styles
├── main.tsx                  # Entry point (ReactDOM)
└── index.css                 # Global CSS reset
```

### Key Frontend Features

**Component Highlights:**
- **TutorCard**: Compact design (25-30% smaller), verified badge
- **TutorRegistration**: 4-step form (Info → Student → Tutor → Confirm)
- **ProtectedRoute**: Role-based access control
- **FilterSidebar**: Advanced filtering (subject, level, location, price)

**State Management:**
- AuthContext for authentication
- NotificationContext for toast messages
- Local state with hooks (useFetch, useForm, usePagination)

**API Integration:**
- Axios interceptors for token injection
- Error handling with toast notifications
- Response adapters for data transformation

---

## 📚 Documentation Files

```
docs/
├── AUTH_API_GUIDE.md         # Authentication API reference
├── DASHBOARD_GUIDE.md        # Dashboard features guide
├── CARD_DESIGN_SYSTEM.md     # Card component design
├── TEST_ACCOUNTS.md          # Test credentials
└── DE_CUONG_CHI_TIET.md      # Đề cương chi tiết (Vietnamese)
```

---

## 🔧 Configuration Files

### Root Level

- **.env** - Environment variables (DB config, JWT secret)
- **.env.example** - Template for .env
- **package.json** - Dependencies and npm scripts
- **vite.config.ts** - Vite build configuration
- **tsconfig.json** - TypeScript main config
- **tsconfig.app.json** - TypeScript app config
- **tsconfig.node.json** - TypeScript node config
- **eslint.config.js** - ESLint rules
- **.prettierrc** - Prettier formatting rules
- **.gitignore** - Git ignore patterns

### Special Files

- **START.bat** - Windows script to start both servers
- **index.html** - HTML entry point
- **README.md** - Main project documentation
- **HUONG_DAN_DAY_DU.md** - Hướng dẫn cài đặt đầy đủ
- **ARCHITECTURE.md** - System architecture
- **CONTRIBUTING.md** - Contribution guidelines

---

## 📦 Dependencies

### Frontend
```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.4",
  "axios": "^1.13.2"
}
```

### Backend
```json
{
  "express": "^4.21.2",
  "mysql2": "^3.15.3",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.5",
  "dotenv": "^16.6.1",
  "express-validator": "^7.3.1"
}
```

### Dev Dependencies
```json
{
  "typescript": "~5.9.3",
  "vite": "npm:rolldown-vite@7.1.14",
  "@vitejs/plugin-react": "^5.0.4",
  "concurrently": "^9.2.1",
  "nodemon": "^3.1.11"
}
```

---

## 🚀 NPM Scripts

```json
{
  "dev": "Run both frontend + backend",
  "dev:frontend": "Run only frontend (Vite)",
  "dev:backend": "Run only backend (Node)",
  "server": "Run backend server",
  "server:dev": "Run backend with nodemon",
  "build": "Build production bundle",
  "preview": "Preview production build",
  "lint": "Run ESLint",
  "lint:fix": "Fix ESLint errors",
  "format": "Format with Prettier",
  "check": "Quick DB health check",
  "check:full": "Full system statistics",
  "setup": "Create demo data"
}
```

---

## 🎯 File Naming Conventions

### Backend
- **Controllers**: `{resource}Controller.js` (camelCase)
- **Routes**: `{resource}Routes.js` (camelCase)
- **Scripts**: `{action}-{resource}.js` (kebab-case)

### Frontend
- **Components**: `{ComponentName}.tsx` (PascalCase)
- **Pages**: `{PageName}Page.tsx` (PascalCase + Page suffix)
- **Hooks**: `use{HookName}.ts` (camelCase with use prefix)
- **Types**: `{domain}.types.ts` (lowercase + .types suffix)
- **API**: `{resource}.api.ts` (lowercase + .api suffix)
- **Styles**: `{component-name}.css` (kebab-case)

---

## 📊 Code Organization Principles

### Backend (MVC-like)
```
Routes → Controllers → Database
```
- Routes: Define endpoints + validate input
- Controllers: Business logic + data processing
- Config: Database connection pool

### Frontend (Component-based)
```
Pages → Components → API → Backend
```
- Pages: Route-level components
- Components: Reusable UI elements
- API Layer: Centralized HTTP requests
- Contexts: Global state (Auth, Notifications)

---

## 🔒 Authentication Flow

```
1. User logs in → authController.login()
2. Generate JWT token → Include user info
3. Send token to frontend → Store in localStorage
4. Frontend includes token in headers → Axios interceptor
5. Backend validates token → auth.js middleware
6. Grant/Deny access → Based on role
```

---

## 🎨 Styling Architecture

### CSS Organization
```
Global Styles (index.css)
    ↓
Design System (design-system.css)
    ↓
Component Styles (tutor-card.css, post-card.css)
    ↓
Page Styles (homepage-figma.css, auth-page-figma.css)
```

### Design Tokens
- Colors defined in design-system.css
- Typography scale: 0.75rem → 2rem
- Spacing: 0.25rem increments
- Border radius: 4px, 8px, 12px, 16px

---

## 🧩 Data Flow

### Tutor List Page Example
```
1. TutorsListPage.tsx → Mount
2. useFetch hook → Call tutorsAPI.getTutors()
3. axios.ts → Add auth token to headers
4. GET /api/tutors → tutorController.getTutors()
5. Database query → Filter + Join tables
6. Response → Transform with dataAdapter
7. State update → Re-render with new data
8. TutorCard.tsx → Display each tutor
```

---

## 🔍 Debugging Tips

### Backend Debugging
```bash
# Check database connection
npm run check

# View all data
node backend/check-all-tables.js

# Check specific table structure
node backend/check-tables.js

# View system stats
npm run check:full
```

### Frontend Debugging
- React DevTools: Inspect component tree
- Network tab: Check API calls
- Console: View errors and logs
- localStorage: Check auth token

---

## 📈 Performance Optimizations

### Frontend
- ✅ Vite for fast HMR
- ✅ Code splitting (lazy loading planned)
- ✅ Debounced search (useDebounce)
- ✅ Pagination for large lists

### Backend
- ✅ Database indexes on foreign keys
- ✅ Connection pooling (mysql2)
- ✅ JWT for stateless auth
- ✅ Query optimization with JOINs

---

## 🚧 Known Limitations

- Chat feature: UI only (no real-time backend)
- File upload: Not implemented yet
- Email notifications: Planned feature
- Advanced search: Basic implementation
- Mobile optimization: Partial

---

## 📝 Development Workflow

### Adding a New Feature

1. **Backend:**
   - Create controller function
   - Add route in routes file
   - Test with quick-check.js

2. **Frontend:**
   - Create API function in api/
   - Add types in types/
   - Create/update component
   - Add route in App.tsx

3. **Testing:**
   - Test backend endpoint with Postman
   - Test frontend with browser DevTools
   - Check database with check-system.js

---

<div align="center">

**📂 Cấu Trúc Dự Án - TutorLink TVU**

Tài liệu này giúp hiểu rõ cách tổ chức code và mục đích từng thư mục/file

Made with ❤️ by Lê Tuấn Khá

</div>
