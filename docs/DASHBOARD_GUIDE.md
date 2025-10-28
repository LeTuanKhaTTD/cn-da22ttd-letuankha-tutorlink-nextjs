# 📊 Dashboard Hướng Dẫn Sử Dụng

## 🎯 Tổng Quan

Hệ thống TutorLink có 3 loại dashboard cho 3 nhóm người dùng:

1. **👪 Parent Dashboard** - Dành cho Phụ huynh
2. **🎓 Tutor Dashboard** - Dành cho Gia sư (Sinh viên TVU)
3. **👨‍💼 Admin Dashboard** - Dành cho Quản trị viên

---

## 👪 Parent Dashboard (`/dashboard/parent`)

### Tính năng chính:

**📊 Stats Overview:**
- Tổng số bài đăng
- Bài đăng đang tuyển
- Số đơn ứng tuyển nhận được
- Số gia sư đã thuê

**🔧 Quản lý:**
- ✅ **Bài đăng của tôi:** Xem, chỉnh sửa, xóa bài đăng
- ✅ **Đơn ứng tuyển:** Chấp nhận/từ chối đơn từ gia sư
- ✅ **Gia sư đã thuê:** Quản lý gia sư hiện tại

**📝 Quick Actions:**
- Đăng tin tìm gia sư mới
- Tìm kiếm gia sư

### Responsive Design:
- **Mobile:** Stats grid 2x2, tabs scroll horizontal
- **Tablet:** Stats grid 4x1
- **Desktop:** Full layout với 2 columns cards

---

## 🎓 Tutor Dashboard (`/dashboard/tutor`)

### Tính năng chính:

**👤 Profile Summary:**
- MSSV, Mã lớp (Badge xác thực)
- Rating trung bình
- Thu nhập tích lũy

**📊 Stats:**
- Tổng đơn đã gửi
- Đơn được chấp nhận
- Thu nhập (VNĐ)

**🔧 Quản lý:**
- ✅ **Bài đăng mới:** Xem và ứng tuyển vào bài đăng phù hợp
- ✅ **Đơn của tôi:** Theo dõi trạng thái (Pending, Accepted, Rejected)
- ✅ **Lịch dạy:** Calendar quản lý lịch dạy

### Badge xác thực:
```tsx
<div className="verified-badge">
  ✓ Đã xác thực - MSSV: 110122086
</div>
```

### Responsive Design:
- **Mobile:** Stats grid 3 columns (fit content)
- **Tablet:** Stats horizontal với icons lớn
- **Desktop:** Profile card flex row

---

## 👨‍💼 Admin Dashboard (`/dashboard/admin`)

### Tính năng chính:

**📊 Stats Grid (6 cards):**
- Tổng người dùng
- Gia sư
- Phụ huynh
- Chờ duyệt
- Bài đăng
- Đơn ứng tuyển

**🔔 Recent Activities:**
- Đăng ký mới
- Bài đăng mới
- Ứng tuyển
- Xác thực

**🔧 Quản lý:**
- ✅ **Chờ xác thực:** Phê duyệt/từ chối MSSV gia sư
- ✅ **Người dùng:** Filter theo Phụ huynh/Gia sư
- ✅ **Bài đăng:** Filter theo trạng thái
- ✅ **Thống kê:** Charts (Users, Posts theo tháng)

### Verification Flow:
```tsx
// Admin kiểm tra MSSV
1. View tutor info (MSSV, Mã lớp, Khoa, Ngành)
2. Click "Phê duyệt" → Status = "Hoạt động"
   or "Từ chối" → Nhập lý do
3. Tutor nhận notification
```

### Responsive Design:
- **Mobile:** Stats grid 2x3
- **Tablet:** Stats grid 3x2
- **Desktop:** Stats grid 6x1, verification cards 2 columns

---

## 🎨 Design Principles

### 1. Mobile First Approach

```css
/* Base: Mobile */
.stats-grid {
  grid-template-columns: repeat(2, 1fr);
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
```

### 2. Touch-Friendly

- **Buttons:** min-height 44px (chuẩn Apple/Google)
- **Tabs:** Scroll horizontal trên mobile
- **Cards:** Hover effects chỉ trên desktop

```css
/* Touch targets */
.tab-btn {
  min-height: 44px;
  padding: 0.875rem 1rem;
}

/* Active state cho mobile */
.tab-btn:active {
  transform: scale(0.98);
}

/* Hover chỉ trên desktop */
@media (hover: hover) {
  .tab-btn:hover {
    cursor: pointer;
  }
}
```

### 3. Responsive Typography

```css
/* Fluid font sizes */
h1 {
  font-size: clamp(1.5rem, 5vw, 2rem);
  /* Mobile: 24px → Desktop: 32px */
}

/* Tránh mobile auto-zoom */
input, textarea {
  font-size: 16px; /* Min 16px */
}
```

### 4. Color Scheme

```css
/* Parent Dashboard */
--primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Tutor Dashboard */
--verified: linear-gradient(135deg, #10b981 0%, #059669 100%);
--warning: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);

/* Admin Dashboard */
--info: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
--success: linear-gradient(135deg, #10b981 0%, #059669 100%);
--danger: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
```

---

## 🚀 Cách Sử Dụng

### 1. Routes

```tsx
// App.tsx
<Route path="dashboard/parent" element={<ParentDashboard />} />
<Route path="dashboard/tutor" element={<TutorDashboard />} />
<Route path="dashboard/admin" element={<AdminDashboard />} />
```

### 2. Navigation

```tsx
// Từ AuthPage sau khi login
if (userType === 'parent') {
  navigate('/dashboard/parent')
} else if (userType === 'tutor') {
  navigate('/dashboard/tutor')
} else if (userType === 'admin') {
  navigate('/dashboard/admin')
}
```

### 3. Testing trên Mobile

```bash
# Expose local dev server
npm run dev -- --host

# Access từ điện thoại (cùng WiFi)
http://192.168.1.100:5173/dashboard/parent
```

**Chrome DevTools:**
- F12 → Toggle Device Toolbar (Ctrl + Shift + M)
- Test devices: iPhone 14 (390px), Samsung Galaxy S21 (412px)

---

## 📱 Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| **Mobile** | < 768px | 1-2 columns, vertical stack |
| **Tablet** | 768px - 1024px | 2-4 columns, hybrid |
| **Desktop** | > 1024px | 4-6 columns, horizontal |

---

## 🔄 State Management

```tsx
const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1')
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  // Fetch data from API
  fetchDashboardData().then(() => setIsLoading(false))
}, [])
```

---

## 🎯 Performance

**Optimization:**
- Lazy loading: `React.lazy()` cho tabs
- Code splitting: Separate bundles per dashboard
- Image optimization: `loading="lazy"`
- Bundle size: < 500KB total

---

## 🐛 Testing Checklist

- [ ] Mobile (375px, 414px): Tabs scroll, buttons 44px+
- [ ] Tablet (768px): 2-4 columns grid
- [ ] Desktop (1024px+): Full layout
- [ ] Touch: Active states (scale 0.98)
- [ ] Hover: Only on desktop (`@media (hover: hover)`)
- [ ] Loading state: Spinner animation
- [ ] Empty state: Clear messaging
- [ ] API calls: Error handling with try-catch

---

## 📚 Files Structure

```
src/pages/
├── ParentDashboard.tsx       # 200+ lines
├── ParentDashboard.css       # 350+ lines
├── TutorDashboard.tsx        # 180+ lines
├── TutorDashboard.css        # 320+ lines
├── AdminDashboard.tsx        # 220+ lines
└── AdminDashboard.css        # 340+ lines

Total: ~1,600 lines code
```

---

## 🎨 UI Components Reused

**Common:**
- `.dashboard-loading` - Spinner
- `.stats-grid` - Stats cards
- `.dashboard-tabs` - Tab navigation
- `.empty-state` - No data message

**Cards:**
- `.post-card` - Bài đăng
- `.application-card` - Đơn ứng tuyển
- `.tutor-verification-card` - Xác thực gia sư

---

## 💡 Next Steps

1. **Backend Integration:**
   - Replace mock data với API calls
   - Add authentication middleware
   - WebSocket cho real-time updates

2. **Advanced Features:**
   - Charts với Chart.js/Recharts
   - Export data to Excel/PDF
   - Push notifications
   - Email alerts

3. **Testing:**
   - Unit tests với Jest
   - E2E tests với Cypress
   - Performance testing với Lighthouse

---

## 📞 Support

Nếu gặp vấn đề:
1. Check browser console (F12)
2. Test trên Chrome DevTools mobile view
3. Verify routes trong App.tsx
4. Check CSS imports

**Demo URLs:**
- Parent: `http://localhost:5173/dashboard/parent`
- Tutor: `http://localhost:5173/dashboard/tutor`
- Admin: `http://localhost:5173/dashboard/admin`

---

Được phát triển với ❤️ bởi TutorLink Team
