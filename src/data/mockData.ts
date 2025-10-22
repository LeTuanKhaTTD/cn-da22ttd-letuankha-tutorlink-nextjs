import type { Conversation, Post, Tutor, TutorReview } from '../types'

export const tutors: Tutor[] = [
  {
    id: 'tutor-01',
    name: 'Nguyễn Thị Minh Anh',
    title: 'Sinh viên Sư phạm Toán - TVU',
    avatar: 'https://i.pravatar.cc/300?img=1',
    subjects: ['Toán', 'Lý'],
    levels: ['THCS', 'THPT'],
    location: 'Trà Vinh',
    rate: '150.000 VND/buổi',
    rating: 4.9,
    reviewsCount: 45,
    experience: '2 năm',
    mode: 'Kết hợp',
    bio: 'Sinh viên năm 3 ngành Sư phạm Toán. Từng đạt giải Nhì Olympic Toán cấp tỉnh. Kinh nghiệm dạy kèm học sinh THCS, THPT.',
    skills: ['Ôn thi lớp 10', 'Toán nâng cao', 'Phát triển tư duy'],
    schedule: [
      { day: 'Thứ 2', slots: ['18:00 - 19:30', '19:45 - 21:15'] },
      { day: 'Thứ 4', slots: ['18:00 - 19:30'] },
      { day: 'Chủ nhật', slots: ['14:00 - 15:30', '16:00 - 17:30'] }
    ],
    education: 'Sinh viên Sư phạm Toán - Trường ĐH Trà Vinh',
    studentProfile: {
      id: 'sp-01',
      userId: 'tutor-01',
      studentId: '110122086',
      classCode: 'DH21CS01',
      faculty: 'Khoa Sư phạm',
      major: 'Sư phạm Toán',
      academicYear: '2021-2025',
      verified: true,
      verifiedAt: '2025-10-15T10:30:00Z'
    }
  },
  {
    id: 'tutor-02',
    name: 'Trần Văn Bảo',
    title: 'Sinh viên Công nghệ Thông tin - TVU',
    avatar: 'https://i.pravatar.cc/300?img=12',
    subjects: ['Lập trình Python', 'Lập trình C++', 'Toán'],
    levels: ['THPT', 'Đại học'],
    location: 'Trà Vinh',
    rate: '120.000 VND/buổi',
    rating: 4.8,
    reviewsCount: 32,
    experience: '1.5 năm',
    mode: 'Online',
    bio: 'Sinh viên năm 4 Công nghệ Thông tin. Có kinh nghiệm tham gia các dự án web, mobile. Dạy lập trình từ cơ bản đến nâng cao.',
    skills: ['Python cơ bản', 'Thuật toán', 'Web Development'],
    schedule: [
      { day: 'Thứ 3', slots: ['19:00 - 20:30'] },
      { day: 'Thứ 5', slots: ['19:00 - 20:30'] },
      { day: 'Thứ 7', slots: ['09:00 - 10:30', '14:00 - 15:30'] }
    ],
    education: 'Sinh viên CNTT - Trường ĐH Trà Vinh',
    studentProfile: {
      id: 'sp-02',
      userId: 'tutor-02',
      studentId: '110120123',
      classCode: 'DH21IT02',
      faculty: 'Khoa Kỹ thuật và Công nghệ',
      major: 'Công nghệ Thông tin',
      academicYear: '2021-2025',
      verified: true,
      verifiedAt: '2025-10-16T14:20:00Z'
    }
  },
  {
    id: 'tutor-03',
    name: 'Lê Thị Hoàng Yến',
    title: 'Sinh viên Sư phạm Tiếng Anh - TVU',
    avatar: 'https://i.pravatar.cc/300?img=5',
    subjects: ['Tiếng Anh', 'IELTS'],
    levels: ['THCS', 'THPT', 'Giao tiếp'],
    location: 'Trà Vinh',
    rate: '180.000 VND/buổi',
    rating: 4.9,
    reviewsCount: 38,
    experience: '2 năm',
    mode: 'Kết hợp',
    bio: 'Sinh viên năm 3 Sư phạm Tiếng Anh. IELTS 7.5 speaking 8.0. Kinh nghiệm dạy giao tiếp và ôn thi IELTS cho học sinh THPT.',
    skills: ['IELTS Speaking', 'Phát âm chuẩn', 'Giao tiếp tự nhiên'],
    schedule: [
      { day: 'Thứ 2', slots: ['18:00 - 19:30'] },
      { day: 'Thứ 6', slots: ['19:00 - 20:30'] },
      { day: 'Chủ nhật', slots: ['15:00 - 16:30'] }
    ],
    education: 'Sinh viên Sư phạm Tiếng Anh - Trường ĐH Trà Vinh',
    studentProfile: {
      id: 'sp-03',
      userId: 'tutor-03',
      studentId: '110122045',
      classCode: 'DH22EN01',
      faculty: 'Khoa Sư phạm',
      major: 'Sư phạm Tiếng Anh',
      academicYear: '2022-2026',
      verified: true,
      verifiedAt: '2025-10-17T09:15:00Z'
    }
  },
  {
    id: 'tutor-04',
    name: 'Phạm Minh Tuấn',
    title: 'Sinh viên Kế toán - TVU',
    avatar: 'https://i.pravatar.cc/300?img=13',
    subjects: ['Toán', 'Kế toán'],
    levels: ['THCS', 'THPT', 'Đại học'],
    location: 'Trà Vinh',
    rate: '140.000 VND/buổi',
    rating: 4.7,
    reviewsCount: 25,
    experience: '1 năm',
    mode: 'Offline',
    bio: 'Sinh viên năm 2 ngành Kế toán. Điểm GPA 3.8. Đam mê toán học và dạy kèm học sinh cấp 2, 3.',
    skills: ['Toán THCS', 'Kế toán cơ bản', 'Giải bài tập'],
    schedule: [
      { day: 'Thứ 3', slots: ['17:30 - 19:00'] },
      { day: 'Thứ 5', slots: ['17:30 - 19:00'] },
      { day: 'Thứ 7', slots: ['08:00 - 09:30', '10:00 - 11:30'] }
    ],
    education: 'Sinh viên Kế toán - Trường ĐH Trà Vinh',
    studentProfile: {
      id: 'sp-04',
      userId: 'tutor-04',
      studentId: '110123067',
      classCode: 'DH23AC01',
      faculty: 'Khoa Kinh tế',
      major: 'Kế toán',
      academicYear: '2023-2027',
      verified: true,
      verifiedAt: '2025-10-18T11:45:00Z'
    }
  },
  {
    id: 'tutor-05',
    name: 'Võ Thị Mai Linh',
    title: 'Sinh viên Quản trị Kinh doanh - TVU',
    avatar: 'https://i.pravatar.cc/300?img=9',
    subjects: ['Tiếng Anh', 'Marketing'],
    levels: ['THPT', 'Đại học'],
    location: 'Trà Vinh',
    rate: '130.000 VND/buổi',
    rating: 4.6,
    reviewsCount: 18,
    experience: '1 năm',
    mode: 'Online',
    bio: 'Sinh viên năm 2 QTKD. TOEIC 850. Có kinh nghiệm thực tập tại công ty Marketing. Dạy tiếng Anh giao tiếp và Marketing cơ bản.',
    skills: ['Business English', 'TOEIC', 'Marketing cơ bản'],
    schedule: [
      { day: 'Thứ 4', slots: ['19:00 - 20:30'] },
      { day: 'Thứ 6', slots: ['20:00 - 21:30'] },
      { day: 'Chủ nhật', slots: ['09:00 - 10:30'] }
    ],
    education: 'Sinh viên QTKD - Trường ĐH Trà Vinh',
    studentProfile: {
      id: 'sp-05',
      userId: 'tutor-05',
      studentId: '110123089',
      classCode: 'DH23BA02',
      faculty: 'Khoa Kinh tế',
      major: 'Quản trị Kinh doanh',
      academicYear: '2023-2027',
      verified: true,
      verifiedAt: '2025-10-19T13:20:00Z'
    }
  }
]

export const tutorReviews: TutorReview[] = [
  {
    id: 'review-01',
    author: 'Phụ huynh Lê Thị Lan',
    rating: 5,
    comment: 'Cô Minh Anh dạy rất dễ hiểu, nhiệt tình. Con tôi tiến bộ rõ rệt sau 2 tháng học. Điểm Toán tăng từ 6 lên 8.',
    date: '15/12/2024'
  },
  {
    id: 'review-02',
    author: 'Phụ huynh Nguyễn Văn Hải',
    rating: 5,
    comment: 'Thầy Bảo hướng dẫn lập trình rất chi tiết, tận tâm. Con học được nhiều kiến thức thực tế về Python.',
    date: '10/12/2024'
  },
  {
    id: 'review-03',
    author: 'Phụ huynh Trần Thị Hoa',
    rating: 4.5,
    comment: 'Cô Yến phát âm chuẩn, dạy speaking rất hay. Con tự tin giao tiếp tiếng Anh hơn nhiều.',
    date: '05/12/2024'
  },
  {
    id: 'review-04',
    author: 'Phụ huynh Võ Minh Tuấn',
    rating: 4.5,
    comment: 'Thầy Tuấn giải bài tập kỹ, dễ hiểu. Con hiểu rõ hơn về các dạng toán đại số.',
    date: '01/12/2024'
  }
]

export const posts: Post[] = [
  {
    id: 'post-01',
    parentName: 'Phạm Thanh Tâm',
    studentName: 'Nguyễn Thanh Lâm - Lớp 9',
    subject: 'Toán - Ôn thi vào 10',
    level: 'THCS',
    location: 'Quận 7, TP. HCM',
    budget: '350.000 VND/buổi',
    frequency: '3 buổi/tuần',
    description: 'Cần gia sư có kinh nghiệm ôn thi vào lớp 10, ưu tiên giáo viên đang dạy tại trường chuyên.',
    requirements: ['Cựu học sinh chuyên', 'Có đề cương ôn tập rõ ràng', 'Dạy tại nhà'],
    createdAt: '10/10/2024'
  },
  {
    id: 'post-02',
    parentName: 'Nguyễn Hồng Nhung',
    studentName: 'Trần Minh Quân - Lớp 6',
    subject: 'Tiếng Anh giao tiếp',
    level: 'THCS',
    location: 'Quận Cầu Giấy, Hà Nội',
    budget: '250.000 VND/buổi',
    frequency: '2 buổi/tuần',
    description: 'Tìm gia sư có khả năng tạo môi trường giao tiếp tự nhiên cho học sinh lớp 6.',
    requirements: ['Ưu tiên giáo viên trẻ', 'Có tài liệu tự biên soạn', 'Linh hoạt về thời gian'],
    createdAt: '05/10/2024'
  },
  {
    id: 'post-03',
    parentName: 'Lê Quốc Hùng',
    studentName: 'Lê Quang Huy - Năm 1 Đại học',
    subject: 'Lập trình Python',
    level: 'Đại học',
    location: 'Online',
    budget: '300.000 VND/buổi',
    frequency: '2 buổi/tuần',
    description: 'Cần người hướng dẫn Python căn bản đến project Machine Learning nhỏ.',
    requirements: ['Có kinh nghiệm làm dự án thực tế', 'Hướng dẫn từ xa', 'Theo sát tiến độ'],
    createdAt: '02/10/2024'
  }
]

export const conversations: Conversation[] = [
  {
    id: 'chat-01',
    with: 'Cô Minh Anh',
    lastMessage: 'Con em tiếp thu bài rất tốt, tuần tới mình tăng độ khó nhé!',
    timestamp: '15 phút trước',
    unread: 0,
    messages: [
      {
        id: 'msg-01',
        sender: 'parent',
        body: 'Chào cô, tôi muốn trao đổi thêm về buổi ôn thi thử.',
        time: '19:30'
      },
      {
        id: 'msg-02',
        sender: 'tutor',
        body: 'Chào chị, con chị đã hoàn thành bài tập chưa ạ?',
        time: '19:32'
      },
      {
        id: 'msg-03',
        sender: 'parent',
        body: 'Dạ, cháu đã làm xong và hiểu bài.',
        time: '19:45'
      }
    ]
  },
  {
    id: 'chat-02',
    with: 'Thầy Quốc Bảo',
    lastMessage: 'Thầy gửi tài liệu ôn thi mới, chị kiểm tra hộp thư nhé.',
    timestamp: '2 giờ trước',
    unread: 2,
    messages: [
      {
        id: 'msg-10',
        sender: 'tutor',
        body: 'Em vừa gửi thêm tài liệu giải thuật, chị xem nhé.',
        time: '16:45'
      }
    ]
  }
]
