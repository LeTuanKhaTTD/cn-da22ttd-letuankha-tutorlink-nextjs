// Thông tin sinh viên TVU (CHỈ DÀNH CHO GIA SƯ - BẮT BUỘC)
export interface StudentProfile {
  id: string;
  userId: string;
  studentId: string;        // MSSV (Mã số sinh viên) - BẮT BUỘC
  classCode: string;        // Mã lớp - BẮT BUỘC
  faculty: string;          // Khoa
  major: string;            // Ngành học
  academicYear: string;     // Năm học (VD: 2021-2025)
  verified: boolean;        // Đã xác minh bởi admin
  verifiedAt?: string;
}

// Thông tin gia sư (BẮT BUỘC phải là sinh viên TVU)
export interface Tutor {
  id: string;
  name: string;
  title: string;
  avatar: string;           // URL ảnh đại diện - BẮT BUỘC
  subjects: string[];
  levels: string[];
  location: string;
  rate: string;
  rating: number;
  reviewsCount: number;
  experience: string;
  mode: 'Online' | 'Offline' | 'Kết hợp';
  bio: string;
  skills: string[];
  schedule: Array<{ day: string; slots: string[] }>;
  education: string;
  
  // Thông tin sinh viên TVU - BẮT BUỘC khi đăng ký gia sư
  studentProfile: StudentProfile;
}

export interface TutorReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Post {
  id: string;
  parentName: string;
  studentName: string;
  subject: string;
  level: string;
  location: string;
  budget: string;
  frequency: string;
  description: string;
  requirements: string[];
  createdAt: string;
}

export interface Conversation {
  id: string;
  with: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Array<{
    id: string;
    sender: 'parent' | 'tutor';
    body: string;
    time: string;
  }>;
}
