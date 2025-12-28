# CONTRIBUTING

Hướng dẫn đóng góp cho dự án TutorLink

## 🎯 Quy Tắc Chung

### Code Style

- **Language**: TypeScript (strict mode enabled)
- **Formatter**: Prettier (cấu hình trong `.prettierrc`)
- **Linter**: ESLint (cấu hình trong `.eslintrc.json`)
- **Naming Convention**:
  - Components: PascalCase (e.g., `TutorCard.tsx`)
  - Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`)
  - Utils: camelCase (e.g., `formatDate`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
  - Types: PascalCase (e.g., `User`, `TutorFilter`)

### File Organization

```
src/
├── components/
│   └── TutorCard.tsx       # Component + styles trong cùng folder nếu cần
├── hooks/
│   └── useAuth.ts          # Custom hooks
├── utils/
│   └── format.ts           # Utility functions
├── types/
│   └── user.types.ts       # Type definitions
└── config/
    └── constants.ts        # Constants
```

---

## 📝 Commit Messages

Sử dụng **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>
<footer>
```

### Types

- `feat`: Tính năng mới
- `fix`: Sửa lỗi
- `docs`: Thay đổi documentation
- `style`: Formatting, missing semi-colons, etc.
- `refactor`: Code refactoring
- `test`: Thêm tests
- `chore`: Build tasks, package manager configs

### Examples

```bash
feat(tutor): add MSSV verification badge to TutorCard

fix(auth): resolve token refresh infinite loop

docs(readme): update installation instructions

refactor(hooks): extract useFetch hook from components
```

---

## 🔄 Development Workflow

### 1. Fork & Clone

```bash
# Fork repository trên GitHub
# Clone fork về máy local
git clone https://github.com/YOUR_USERNAME/cn-da22ttd-letuankha-tutorlink-nextjs.git
cd cn-da22ttd-letuankha-tutorlink-nextjs
```

### 2. Create Branch

```bash
# Tạo branch mới từ main
git checkout -b feature/your-feature-name
```

Branch naming:
- `feature/` - Tính năng mới
- `fix/` - Sửa lỗi
- `docs/` - Documentation
- `refactor/` - Refactoring

### 3. Make Changes

```bash
# Cài dependencies
npm install

# Chạy dev server
npm run dev

# Viết code...
```

### 4. Run Checks

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check

# Build để test
npm run build
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat(scope): your commit message"
```

### 6. Push & Create PR

```bash
# Push lên fork
git push origin feature/your-feature-name

# Tạo Pull Request trên GitHub
```

---

## ✅ Pull Request Guidelines

### PR Title

Format giống commit message:

```
feat(tutor): add MSSV verification badge
```

### PR Description Template

```markdown
## 📝 Description
Brief description of what this PR does.

## 🎯 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## 🧪 Testing
How to test this change:
1. Step 1
2. Step 2
3. Expected result

## 📸 Screenshots (if applicable)
Before:
After:

## ✅ Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed code
- [ ] Commented code (if needed)
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tested locally
```

---

## 🏗️ Adding New Features

### 1. Add New Component

```typescript
// src/components/MyComponent.tsx
interface MyComponentProps {
  title: string
  onSubmit: (data: any) => void
}

export function MyComponent({ title, onSubmit }: MyComponentProps) {
  return (
    <div className="my-component">
      <h2>{title}</h2>
      {/* ... */}
    </div>
  )
}
```

**Checklist**:
- [ ] Props interface defined
- [ ] Component exported
- [ ] TypeScript strict types
- [ ] Accessible (ARIA attributes if needed)
- [ ] Responsive design

### 2. Add New Custom Hook

```typescript
// src/hooks/useMyHook.ts
import { useState, useEffect } from 'react'

interface UseMyHookOptions {
  initialValue?: string
}

export function useMyHook(options: UseMyHookOptions = {}) {
  const [value, setValue] = useState(options.initialValue || '')
  
  // ... hook logic
  
  return { value, setValue }
}
```

**Checklist**:
- [ ] Named with `use` prefix
- [ ] Options interface defined
- [ ] Return type explicit
- [ ] Documented with comments

### 3. Add New API Endpoint

```typescript
// src/api/my-feature.api.ts
import { api } from './axios'
import { API_ENDPOINTS } from '@/config'

export const myFeatureApi = {
  getData: async (): Promise<MyDataType> => {
    const response = await api.get(API_ENDPOINTS.MY_FEATURE.GET)
    return response.data
  }
}
```

**Checklist**:
- [ ] Import axios instance
- [ ] Return type defined
- [ ] Error handling
- [ ] Endpoint in `config/api.config.ts`

### 4. Add New Service

```typescript
// src/services/my-feature.service.ts
import { myFeatureApi } from '@/api'

export const myFeatureService = {
  async getData() {
    try {
      return await myFeatureApi.getData()
    } catch (error: any) {
      const message = error.response?.data?.message || 'Lỗi không xác định'
      throw new Error(message)
    }
  }
}
```

**Checklist**:
- [ ] Business logic extracted
- [ ] Error messages in Vietnamese
- [ ] Type-safe

### 5. Add New Types

```typescript
// src/types/my-feature.types.ts
export interface MyDataType {
  id: string
  name: string
  createdAt: string
}

export interface MyFilterType {
  search?: string
  page?: number
}
```

**Checklist**:
- [ ] Exported interfaces
- [ ] Added to `types/index.ts`
- [ ] Used across codebase

---

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
## 🐛 Bug Description
Clear description of the bug.

## 🔄 Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## 💡 Expected Behavior
What should happen.

## 📸 Screenshots
If applicable, add screenshots.

## 🖥️ Environment
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Node version: [e.g. 20.10.0]

## 📝 Additional Context
Any other context about the problem.
```

---

## 🎨 Code Quality Standards

### TypeScript

```typescript
// ✅ Good
interface User {
  id: string
  name: string
}

function getUser(id: string): Promise<User> {
  return api.get(`/users/${id}`)
}

// ❌ Bad
function getUser(id) {  // Missing types
  return api.get(`/users/${id}`)
}
```

### Imports

```typescript
// ✅ Good - Use path aliases
import { User } from '@/types'
import { formatDate } from '@/utils'
import { authService } from '@/services'

// ❌ Bad - Relative paths
import { User } from '../../../types'
import { formatDate } from '../../utils/format'
```

### Components

```typescript
// ✅ Good - Props interface + clear types
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button className={variant} onClick={onClick}>{label}</button>
}

// ❌ Bad - No types, unclear props
export function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>
}
```

### Error Handling

```typescript
// ✅ Good - Try-catch + user-friendly message
try {
  await tutorService.createTutor(data)
  showToast('Tạo hồ sơ thành công', 'success')
} catch (error) {
  showToast(error.message, 'error')
}

// ❌ Bad - No error handling
await tutorService.createTutor(data)
showToast('Tạo hồ sơ thành công', 'success')
```

---

## 📚 Documentation

### JSDoc Comments

```typescript
/**
 * Format date to Vietnamese locale
 * @param date - Date string or Date object
 * @param format - 'short' for dd/mm/yyyy, 'long' for full text
 * @returns Formatted date string
 * @example
 * formatDate('2024-01-15', 'short') // '15/01/2024'
 */
export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  // ...
}
```

### README Updates

Khi thêm tính năng mới, update:
- [ ] README.md - Tính năng overview
- [ ] ARCHITECTURE.md - Kiến trúc changes
- [ ] API docs (nếu có)

---

## ✨ Best Practices

1. **Keep Components Small**: Mỗi component < 200 lines
2. **Extract Logic**: Business logic → services, UI logic → hooks
3. **Type Everything**: Không dùng `any` trừ khi thực sự cần
4. **Meaningful Names**: `getUserById` thay vì `get` or `fetch`
5. **Consistent Formatting**: Chạy `npm run format` trước commit
6. **Error Messages**: Vietnamese cho user-facing messages
7. **Performance**: Dùng `useMemo`, `useCallback` cho expensive operations
8. **Accessibility**: Thêm ARIA labels cho interactive elements

---

## 🙏 Need Help?

- 📧 Email: letuankha.dev@gmail.com
- 💬 GitHub Issues: [Open an issue](https://github.com/LeTuanKhaTTD/cn-da22ttd-letuankha-tutorlink-nextjs/issues)
- 📖 Docs: Xem ARCHITECTURE.md, README.md

**Happy Coding! 🚀**
