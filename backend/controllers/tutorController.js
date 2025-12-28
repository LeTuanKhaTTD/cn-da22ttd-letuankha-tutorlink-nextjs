import pool from '../config/database.js';

/**
 * Lấy danh sách tất cả gia sư TVU
 */
export const getAllTutors = async (req, res) => {
  try {
    const { nganh, minPrice, maxPrice, rating, page = 1, limit = 10 } = req.query;
    
    let query = `
      SELECT 
        nd.id,
        nd.ho_ten,
        nd.email,
        nd.so_dien_thoai,
        nd.avatar_url,
        hsv.ma_sinh_vien,
        hsv.ma_lop,
        hsv.khoa,
        hsv.nganh_hoc,
        hsv.nam_hoc,
        hsv.da_xac_thuc,
        hsg.tieu_de,
        hsg.gioi_thieu,
        hsg.hoc_phi_gio,
        hsg.hinh_thuc,
        hsg.kinh_nghiem,
        hsg.danh_gia_trung_binh,
        hsg.so_danh_gia,
        hsg.trang_thai
      FROM nguoi_dung nd
      INNER JOIN ho_so_sinh_vien hsv ON nd.id = hsv.nguoi_dung_id
      INNER JOIN ho_so_gia_su hsg ON nd.id = hsg.nguoi_dung_id
      WHERE nd.vai_tro = 'gia_su' 
        AND nd.trang_thai = 'hoat_dong'
        AND hsg.trang_thai = 'hoat_dong'
    `;
    
    const params = [];
    
    // Filter theo ngành học
    if (nganh) {
      query += ` AND hsv.nganh_hoc = ?`;
      params.push(nganh);
    }
    
    // Filter theo giá
    if (minPrice) {
      query += ` AND hsg.hoc_phi_gio >= ?`;
      params.push(parseFloat(minPrice));
    }
    if (maxPrice) {
      query += ` AND hsg.hoc_phi_gio <= ?`;
      params.push(parseFloat(maxPrice));
    }
    
    // Filter theo rating
    if (rating) {
      query += ` AND hsg.danh_gia_trung_binh >= ?`;
      params.push(parseFloat(rating));
    }
    
    // Đếm tổng số kết quả
    const countQuery = query.replace(/SELECT[\s\S]*?FROM/, 'SELECT COUNT(*) as total FROM');
    const [countResult] = await pool.query(countQuery, params);
    const total = countResult[0].total;
    
    // Phân trang
    const offset = (page - 1) * limit;
    query += ` ORDER BY hsg.danh_gia_trung_binh DESC, hsg.so_danh_gia DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));
    
    const [tutors] = await pool.query(query, params);
    
    // Lấy môn học và cấp độ cho từng gia sư
    const tutorsWithSubjects = await Promise.all(tutors.map(async (tutor) => {
      const subjectsQuery = `
        SELECT mh.ten_mon, gsmh.cap_do
        FROM mon_hoc mh
        INNER JOIN gia_su_mon_hoc gsmh ON mh.id = gsmh.mon_hoc_id
        WHERE gsmh.gia_su_id = ?
      `;
      const [subjects] = await pool.query(subjectsQuery, [tutor.id]);
      
      // Parse cap_do JSON và lấy unique levels
      const levels = new Set();
      subjects.forEach(s => {
        try {
          const capDoArray = JSON.parse(s.cap_do || '[]');
          capDoArray.forEach(level => levels.add(level));
        } catch (e) {
          // Nếu không parse được, bỏ qua
        }
      });
      
      return {
        ...tutor,
        mon_hoc: subjects.map(s => s.ten_mon),
        cap_do: Array.from(levels)
      };
    }));
    
    res.json({
      success: true,
      data: tutorsWithSubjects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách gia sư:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách gia sư',
      error: error.message
    });
  }
};

/**
 * Lấy thông tin chi tiết 1 gia sư
 */
export const getTutorById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT 
        nd.id,
        nd.ho_ten,
        nd.email,
        nd.so_dien_thoai,
        nd.avatar_url,
        nd.tao_luc,
        hsv.ma_sinh_vien,
        hsv.ma_lop,
        hsv.khoa,
        hsv.nganh_hoc,
        hsv.nam_hoc,
        hsv.da_xac_thuc,
        hsg.tieu_de,
        hsg.gioi_thieu,
        hsg.hoc_phi_gio,
        hsg.hinh_thuc,
        hsg.kinh_nghiem,
        hsg.danh_gia_trung_binh,
        hsg.so_danh_gia,
        hsg.trang_thai
      FROM nguoi_dung nd
      INNER JOIN ho_so_sinh_vien hsv ON nd.id = hsv.nguoi_dung_id
      INNER JOIN ho_so_gia_su hsg ON nd.id = hsg.nguoi_dung_id
      WHERE nd.id = ? AND nd.vai_tro = 'gia_su'
    `;
    
    const [tutors] = await pool.query(query, [id]);
    
    if (tutors.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy gia sư'
      });
    }
    
    // Lấy danh sách môn học
    const subjectsQuery = `
      SELECT mh.id, mh.ten_mon
      FROM mon_hoc mh
      INNER JOIN gia_su_mon_hoc gsmh ON mh.id = gsmh.mon_hoc_id
      WHERE gsmh.gia_su_id = ?
    `;
    const [subjects] = await pool.query(subjectsQuery, [id]);
    
    res.json({
      success: true,
      data: {
        ...tutors[0],
        mon_hoc: subjects
      }
    });
  } catch (error) {
    console.error('Lỗi khi lấy thông tin gia sư:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy thông tin gia sư',
      error: error.message
    });
  }
};

/**
 * Lấy danh sách ngành học (để làm filter)
 */
export const getMajors = async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT hsv.nganh_hoc, COUNT(*) as so_luong
      FROM ho_so_sinh_vien hsv
      INNER JOIN nguoi_dung nd ON hsv.nguoi_dung_id = nd.id
      WHERE nd.vai_tro = 'gia_su' AND nd.trang_thai = 'hoat_dong'
      GROUP BY hsv.nganh_hoc
      ORDER BY hsv.nganh_hoc
    `;
    
    const [majors] = await pool.query(query);
    
    res.json({
      success: true,
      data: majors
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách ngành học:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách ngành học',
      error: error.message
    });
  }
};

/**
 * Thống kê gia sư
 */
export const getTutorStats = async (req, res) => {
  try {
    const query = `
      SELECT 
        COUNT(*) as tong_gia_su,
        AVG(hsg.hoc_phi_gio) as gia_trung_binh,
        AVG(hsg.danh_gia_trung_binh) as danh_gia_trung_binh,
        COUNT(DISTINCT hsv.nganh_hoc) as so_nganh
      FROM nguoi_dung nd
      INNER JOIN ho_so_sinh_vien hsv ON nd.id = hsv.nguoi_dung_id
      INNER JOIN ho_so_gia_su hsg ON nd.id = hsg.nguoi_dung_id
      WHERE nd.vai_tro = 'gia_su' 
        AND nd.trang_thai = 'hoat_dong'
        AND hsg.trang_thai = 'hoat_dong'
    `;
    
    const [stats] = await pool.query(query);
    
    res.json({
      success: true,
      data: stats[0]
    });
  } catch (error) {
    console.error('Lỗi khi lấy thống kê:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy thống kê',
      error: error.message
    });
  }
};

/**
 * Cập nhật hồ sơ gia sư (cho chính user)
 */
export const updateTutorProfile = async (req, res) => {
  const { id } = req.params;
  const {
    ho_ten,
    so_dien_thoai,
    avatar_url,
    gioi_thieu,
    kinh_nghiem,
    thanh_tich,
    hoc_phi_gio,
    dia_diem_day
  } = req.body;

  try {
    // Kiểm tra quyền: chỉ cho phép update profile của chính mình
    if (req.user.id !== parseInt(id)) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền chỉnh sửa hồ sơ này!'
      });
    }

    // Kiểm tra vai trò phải là gia sư
    if (req.user.vai_tro !== 'gia_su') {
      return res.status(403).json({
        success: false,
        message: 'Chỉ gia sư mới có thể cập nhật hồ sơ này!'
      });
    }

    // Update bảng nguoi_dung
    if (ho_ten || so_dien_thoai || avatar_url) {
      const updateUserFields = [];
      const userParams = [];

      if (ho_ten) {
        updateUserFields.push('ho_ten = ?');
        userParams.push(ho_ten);
      }
      if (so_dien_thoai) {
        updateUserFields.push('so_dien_thoai = ?');
        userParams.push(so_dien_thoai);
      }
      if (avatar_url) {
        updateUserFields.push('avatar_url = ?');
        userParams.push(avatar_url);
      }

      userParams.push(id);

      const updateUserQuery = `
        UPDATE nguoi_dung 
        SET ${updateUserFields.join(', ')}, cap_nhat_luc = NOW()
        WHERE id = ?
      `;
      
      await pool.query(updateUserQuery, userParams);
    }

    // Update bảng ho_so_gia_su
    if (gioi_thieu || kinh_nghiem || thanh_tich || hoc_phi_gio || dia_diem_day) {
      const updateTutorFields = [];
      const tutorParams = [];

      if (gioi_thieu) {
        updateTutorFields.push('gioi_thieu = ?');
        tutorParams.push(gioi_thieu);
      }
      if (kinh_nghiem) {
        updateTutorFields.push('kinh_nghiem = ?');
        tutorParams.push(kinh_nghiem);
      }
      if (thanh_tich) {
        updateTutorFields.push('thanh_tich = ?');
        tutorParams.push(thanh_tich);
      }
      if (hoc_phi_gio) {
        updateTutorFields.push('hoc_phi_gio = ?');
        tutorParams.push(hoc_phi_gio);
      }
      if (dia_diem_day) {
        updateTutorFields.push('dia_diem_day = ?');
        tutorParams.push(dia_diem_day);
      }

      tutorParams.push(id);

      const updateTutorQuery = `
        UPDATE ho_so_gia_su 
        SET ${updateTutorFields.join(', ')}, cap_nhat_luc = NOW()
        WHERE nguoi_dung_id = ?
      `;
      
      await pool.query(updateTutorQuery, tutorParams);
    }

    res.json({
      success: true,
      message: '✅ Cập nhật hồ sơ thành công!'
    });

  } catch (error) {
    console.error('Lỗi khi cập nhật hồ sơ:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi cập nhật hồ sơ',
      error: error.message
    });
  }
};
