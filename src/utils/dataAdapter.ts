/**
 * Adapter functions to convert API data to component format
 */

/**
 * Map grade number to education level
 */
const mapGradeToLevel = (grade: string): string => {
  if (!grade) return 'Không xác định'
  
  const normalized = grade.toLowerCase().replace(/[^0-9]/g, '')
  const gradeNum = parseInt(normalized)
  
  if (gradeNum >= 1 && gradeNum <= 5) return 'Tiểu học'
  if (gradeNum >= 6 && gradeNum <= 9) return 'THCS'
  if (gradeNum >= 10 && gradeNum <= 12) return 'THPT'
  
  // Check for keywords
  if (grade.toLowerCase().includes('tiểu học')) return 'Tiểu học'
  if (grade.toLowerCase().includes('thcs')) return 'THCS'
  if (grade.toLowerCase().includes('thpt')) return 'THPT'
  if (grade.toLowerCase().includes('đại học') || grade.toLowerCase().includes('sinh viên')) return 'Đại học'
  
  return 'Đại học' // Default for programming courses, etc.
}

export const adaptTutorData = (apiTutor: any) => {
  // Parse subjects from array or string
  let subjects = []
  if (Array.isArray(apiTutor.mon_hoc)) {
    subjects = apiTutor.mon_hoc
  } else if (typeof apiTutor.mon_hoc === 'string') {
    subjects = apiTutor.mon_hoc.split(',').map((s: string) => s.trim())
  } else if (apiTutor.nganh_hoc) {
    subjects = [apiTutor.nganh_hoc]
  }

  // Parse levels from cap_do array or default
  let levels = []
  if (Array.isArray(apiTutor.cap_do) && apiTutor.cap_do.length > 0) {
    levels = apiTutor.cap_do
  } else {
    // Default levels based on major
    levels = ['Tiểu học', 'THCS', 'THPT', 'Đại học']
  }
  
  // Parse location - use email domain if no address
  let location = apiTutor.dia_chi || 'TP. Trà Vinh'
  if (!apiTutor.dia_chi && apiTutor.email?.includes('@tvu.edu.vn')) {
    location = 'Trường Đại học Trà Vinh'
  }

  return {
    id: apiTutor.id || apiTutor.nguoi_dung_id,
    gia_su_id: apiTutor.id,
    name: apiTutor.ho_ten,
    title: apiTutor.tieu_de || `Gia sư ${apiTutor.nganh_hoc || 'chuyên nghiệp'}`,
    avatar: apiTutor.avatar_url,
    rating: parseFloat(apiTutor.danh_gia_trung_binh || apiTutor.diem_danh_gia_tb || 0),
    reviewsCount: parseInt(apiTutor.so_danh_gia || apiTutor.so_luong_danh_gia || 0),
    bio: apiTutor.gioi_thieu || apiTutor.mo_ta || '',
    experience: apiTutor.kinh_nghiem || '',
    subjects: subjects,
    levels: levels,
    location: location,
    rate: apiTutor.hoc_phi_gio 
      ? `${new Intl.NumberFormat('vi-VN').format(apiTutor.hoc_phi_gio)}đ/buổi`
      : '100.000đ/buổi',
    mode: apiTutor.hinh_thuc === 'online' ? 'Online' 
        : apiTutor.hinh_thuc === 'offline' ? 'Offline' 
        : 'Kết hợp',
    skills: apiTutor.skills || [],
    studentProfile: apiTutor.ma_sinh_vien ? {
      studentId: apiTutor.ma_sinh_vien,
      classCode: apiTutor.ma_lop,
      major: apiTutor.nganh_hoc,
      verified: apiTutor.da_xac_thuc || apiTutor.da_xac_minh || false
    } : null
  }
}

export const adaptPostData = (apiPost: any) => {
  // Map grade to level if cap_hoc is not provided
  const level = apiPost.cap_hoc || mapGradeToLevel(apiPost.lop)
  
  return {
    id: apiPost.id || apiPost.bai_dang_id,
    bai_dang_id: apiPost.id || apiPost.bai_dang_id,
    title: apiPost.tieu_de,
    description: apiPost.mo_ta,
    subject: apiPost.mon_hoc,
    level: level,
    location: apiPost.dia_chi || apiPost.dia_diem,
    fee: apiPost.hoc_phi 
      ? `${new Intl.NumberFormat('vi-VN').format(apiPost.hoc_phi)}đ/giờ`
      : 'Thương lượng',
    schedule: apiPost.lich_hoc || apiPost.thoi_gian_day,
    mode: apiPost.hinh_thuc === 'online' ? 'Trực tuyến' 
        : apiPost.hinh_thuc === 'offline' ? 'Tại nhà' 
        : 'Kết hợp',
    requirements: apiPost.yeu_cau || '',
    status: apiPost.trang_thai,
    postedDate: apiPost.tao_luc || apiPost.ngay_dang,
    author: {
      name: apiPost.ho_ten_phu_huynh || apiPost.ho_ten,
      phone: apiPost.so_dien_thoai
    },
    applicantsCount: apiPost.so_ung_tuyen || apiPost.so_luong_ung_tuyen || 0
  }
}
