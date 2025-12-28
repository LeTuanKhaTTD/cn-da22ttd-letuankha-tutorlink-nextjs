# ARCHITECTURE

Tài liệu kiến trúc hệ thống TutorLink

## 📐 Kiến Trúc Tổng Quan

TutorLink sử dụng kiến trúc **Three-Tier Architecture** với frontend và backend tách biệt.

```
┌─────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                      │
│         React 19 + TypeScript + Vite + TailwindCSS       │
└────────────────────────┬────────────────────────────────┘
                         │ REST API (axios)
┌────────────────────────▼────────────────────────────────┐
│                   BUSINESS LOGIC LAYER                   │
│              Express.js + TypeScript + Node.js           │
└────────────────────────┬────────────────────────────────┘
                         │ MySQL Queries
┌────────────────────────▼────────────────────────────────┐
│                      DATA LAYER                          │
│                   MySQL 8.0 Database                     │
└─────────────────────────────────────────────────────────┘
```

---

## 🏗️ Frontend Architecture

### Folder Structure (Modular Design)

```
src/
├── api/           # API communication layer
├── components/    # Reusable UI components
├── config/        # Constants & configuration
├── contexts/      # React Context providers
├── hooks/         # Custom React hooks
├── layouts/       # Layout components
├── pages/         # Page-level components
├── services/      # Business logic layer
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

### Phân Tầng Frontend

#### 1. **Presentation Layer** (Components & Pages)
- Components: Reusable UI (TutorCard, SearchBar, Navbar...)
- Pages: Route-level components (HomePage, TutorsListPage...)
- Chỉ quan tâm rendering UI, không chứa business logic

#### 2. **Business Logic Layer** (Services)
- `auth.service.ts`: Login, register, logout
- `tutor.service.ts`: Tutor CRUD, filtering
- `post.service.ts`: Post CRUD, applications
- Xử lý validation, error handling, data transformation

#### 3. **Data Layer** (API & Hooks)
- `api/`: Axios calls đến backend
- `hooks/`: Custom hooks (useFetch, useAuth, useForm...)
- Quản lý state, caching, loading states

---

## 🔄 Data Flow Pattern

### Example: User Login Flow

```
┌──────────────┐
│  AuthPage    │ (Presentation - nhập email/password)
└──────┬───────┘
       │ handleSubmit()
       ▼
┌──────────────┐
│  useForm     │ (Hook - validate input)
└──────┬───────┘
       │ onSubmit()
       ▼
┌──────────────┐
│ authService  │ (Service - business logic)
└──────┬───────┘
       │ login()
       ▼
┌──────────────┐
│  authApi     │ (API - HTTP request)
└──────┬───────┘
       │ POST /api/auth/login
       ▼
┌──────────────┐
│   Backend    │ (Express API)
└──────┬───────┘
       │ Query database
       ▼
┌──────────────┐
│   MySQL DB   │ (Data persistence)
└──────────────┘
```

---

## 🧩 Core Patterns

### 1. **Custom Hooks Pattern**

Tách logic ra khỏi components để tái sử dụng:

```typescript
// hooks/useFetch.ts
export function useFetch<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  // ... fetch logic
  
  return { data, isLoading, error, refetch }
}

// Usage in component
const { data: tutors, isLoading } = useFetch(() => tutorService.getTutors(filters))
```

### 2. **Context API Pattern**

Quản lý global state (authentication, notifications):

```typescript
// contexts/AuthContext.tsx
export function AuthProvider({ children }) {
  const [state, setState] = useState<AuthState>({ ... })
  
  const login = (token, user) => { ... }
  const logout = () => { ... }
  
  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Usage
const { user, isAuthenticated, login } = useAuth()
```

### 3. **Service Layer Pattern**

Tách business logic ra khỏi components:

```typescript
// services/tutor.service.ts
export const tutorService = {
  async getTutors(filters: TutorFilter) {
    try {
      return await tutorsApi.getTutors(filters)
    } catch (error) {
      throw new Error('Không thể tải danh sách gia sư')
    }
  }
}
```

### 4. **Type-Safe API Pattern**

Sử dụng TypeScript để type-safe API calls:

```typescript
// api/tutors.api.ts
export const tutorsApi = {
  getTutors: async (filters: TutorFilter): Promise<PaginatedResponse<Tutor>> => {
    const response = await api.get('/tutors', { params: filters })
    return response.data
  }
}
```

---

## 🛡️ Error Handling Strategy

### 3-Layer Error Handling

1. **API Layer**: Catch HTTP errors
   ```typescript
   api.interceptors.response.use(
     response => response,
     error => {
       if (error.response?.status === 401) {
         // Handle unauthorized
       }
       return Promise.reject(error)
     }
   )
   ```

2. **Service Layer**: Transform to user-friendly messages
   ```typescript
   try {
     return await tutorsApi.getTutors(filters)
   } catch (error: any) {
     const message = error.response?.data?.message || 'Không thể tải danh sách gia sư'
     throw new Error(message)
   }
   ```

3. **Presentation Layer**: Show toasts/alerts
   ```typescript
   try {
     await tutorService.getTutors(filters)
   } catch (error) {
     showToast(error.message, 'error')
   }
   ```

---

## 🔐 Authentication Flow

### Registration & Login

```
1. User submits credentials
   ↓
2. Frontend validates input (useForm hook)
   ↓
3. authService.login() → authApi.login()
   ↓
4. Backend validates → Query DB → Generate JWT
   ↓
5. Frontend receives token + user data
   ↓
6. AuthContext.login() → Save to localStorage
   ↓
7. Redirect to dashboard
```

### MSSV Verification Flow (Tutor Only)

```
1. Tutor registers with MSSV
   ↓
2. Backend saves to `student_profiles` table (da_xac_minh = FALSE)
   ↓
3. Admin views pending verifications
   ↓
4. Admin verifies MSSV (checks against TVU database)
   ↓
5. Admin clicks "Xác thực" → da_xac_minh = TRUE
   ↓
6. Tutor gets badge "✓ Sinh viên TVU"
```

---

## 📦 State Management

### Local State
- `useState`, `useReducer` for component state
- Example: Form inputs, toggle states

### Global State
- `Context API` for app-wide state
- Example: AuthContext (user, token), NotificationContext (toasts)

### Server State
- `useFetch` hook for remote data
- Example: Tutor list, post details

### Persistent State
- `useLocalStorage` hook
- Example: Theme preference, auth token

---

## 🚀 Performance Optimizations

1. **Code Splitting**: React.lazy() for route-based splitting
2. **Path Aliases**: `@/` imports thay vì relative paths
3. **Debouncing**: Search input với useDebounce(500ms)
4. **Memoization**: `useMemo`, `useCallback` cho expensive operations
5. **Vite Optimization**: Rolldown bundler cho build nhanh hơn

---

## 🔄 API Communication

### Axios Instance với Interceptors

```typescript
// Request interceptor: Add auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor: Handle 401 + token refresh
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Attempt token refresh
      // If fails, logout user
    }
    return Promise.reject(error)
  }
)
```

---

## 📝 Type System

### Modular Type Definitions

- `user.types.ts`: User, LoginCredentials, AuthResponse, AuthState
- `tutor.types.ts`: StudentProfile (MSSV), Tutor, TutorRegistrationStep1-4
- `post.types.ts`: Post, Application, CreatePostData, PostFilter
- `message.types.ts`: Conversation, Message, Notification
- `common.types.ts`: PaginationParams, ApiResponse, Toast, SelectOption

### Re-export Pattern

```typescript
// types/index.ts
export * from './user.types'
export * from './tutor.types'
// ... other exports

// Usage anywhere
import { User, Tutor, Post } from '@/types'
```

---

## 🧪 Testing Strategy (Future)

### Unit Tests
- Utils: `format.ts`, `validation.ts`, `helpers.ts`
- Hooks: `useDebounce`, `useFetch`, `useForm`
- Services: `authService`, `tutorService`

### Integration Tests
- API calls with mock server
- Form submission workflows

### E2E Tests
- Registration flow
- Login → Browse tutors → Apply
- Admin verification workflow

---

## 📚 Design Principles

1. **Separation of Concerns**: Components ≠ Business Logic ≠ API Calls
2. **DRY (Don't Repeat Yourself)**: Shared logic in hooks/utils
3. **Single Responsibility**: Mỗi module có 1 mục đích rõ ràng
4. **Type Safety**: TypeScript strict mode, verbatimModuleSyntax
5. **Reusability**: Custom hooks, utility functions, shared components
6. **Scalability**: Modular structure dễ mở rộng

---

## 🔮 Future Improvements

- [ ] Migrate to React Query (server state management)
- [ ] Add Zustand/Redux for complex client state
- [ ] Implement real-time chat với Socket.io
- [ ] Add unit tests với Vitest
- [ ] Add E2E tests với Playwright
- [ ] Implement CI/CD pipeline
- [ ] Add Storybook for component documentation
- [ ] Optimize bundle size với lazy loading
