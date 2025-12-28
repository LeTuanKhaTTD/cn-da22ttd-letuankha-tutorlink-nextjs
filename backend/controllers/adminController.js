import pool from '../config/database.js';

/**
 * LẤY THỐNG KÊ DASHBOARD ADMIN
 */
export const getDashboardStats = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    const [stats] = await connection.query(`
      SELECT 
        (SELECT COUNT(*) FROM nguoi_dung) as totalUsers,
        (SELECT COUNT(*) FROM nguoi_dung WHERE vai_tro = 'gia_su') as totalTutors,
        (SELECT COUNT(*) FROM nguoi_dung WHERE vai_tro = 'phu_huynh') as totalParents,
        (SELECT COUNT(*) FROM ho_so_sinh_vien WHERE da_xac_thuc = FALSE) as pendingVerifications,
        (SELECT COUNT(*) FROM bai_dang WHERE trang_thai = 'mo') as activePosts,
        (SELECT COUNT(*) FROM don_ung_tuyen) as totalApplications
    `);
    
    connection.release();
    
    res.json({
      success: true,
      data: {
        totalUsers: stats[0].totalUsers,
        totalTutors: stats[0].totalTutors,
        totalParents: stats[0].totalParents,
        pendingVerifications: stats[0].pendingVerifications,
        activePosts: stats[0].activePosts,
        totalApplications: stats[0].totalApplications,
        totalEarnings: '0' // TODO: Tính toán thực tế
      }
    });
  } catch (error) {
    console.error('Lỗi lấy thống kê dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy thống kê',
      error: error.message
    });
  }
};

/**
 * LẤY DANH SÁCH GIA SƯ CHỜ XÁC THỰC
 */
export const getPendingTutors = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    const [tutors] = await connection.query(`
      SELECT 
        nd.id,
        nd.ho_ten as name,
        nd.email,
        nd.avatar_url as avatar,
        nd.tao_luc as submittedAt,
        hsv.ma_sinh_vien as studentId,
        hsv.ma_lop as classCode,
        hsv.khoa as faculty,
        hsv.nganh_hoc as major,
        hsg.tieu_de as title,
        hsg.hoc_phi_gio as hourlyRate
      FROM nguoi_dung nd
      JOIN ho_so_sinh_vien hsv ON nd.id = hsv.nguoi_dung_id
      LEFT JOIN ho_so_gia_su hsg ON nd.id = hsg.nguoi_dung_id
      WHERE nd.vai_tro = 'gia_su' 
        AND hsv.da_xac_thuc = FALSE
      ORDER BY nd.tao_luc DESC
    `);
    
    connection.release();
    
    res.json({
      success: true,
      data: tutors
    });
  } catch (error) {
    console.error('Lỗi lấy danh sách gia sư chờ duyệt:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

/**
 * XÁC THỰC MSSV GIA SƯ
 */
export const verifyTutor = async (req, res) => {
  try {
    const { tutorId } = req.params;
    
    const connection = await pool.getConnection();
    
    // 1. Cập nhật trạng thái xác thực sinh viên
    await connection.query(
      `UPDATE ho_so_sinh_vien 
       SET da_xac_thuc = TRUE 
       WHERE nguoi_dung_id = ?`,
      [tutorId]
    );
    
    // 2. Cập nhật trạng thái hồ sơ gia sư thành hoạt động
    await connection.query(
      `UPDATE ho_so_gia_su 
       SET trang_thai = 'hoat_dong' 
       WHERE nguoi_dung_id = ?`,
      [tutorId]
    );
    
    // 3. Lấy thông tin gia sư để trả về
    const [tutor] = await connection.query(
      `SELECT nd.ho_ten, nd.email, hsv.ma_sinh_vien
       FROM nguoi_dung nd
       JOIN ho_so_sinh_vien hsv ON nd.id = hsv.nguoi_dung_id
       WHERE nd.id = ?`,
      [tutorId]
    );
    
    connection.release();
    
    res.json({
      success: true,
      message: `Đã xác thực MSSV cho ${tutor[0].ho_ten}`,
      data: tutor[0]
    });
  } catch (error) {
    console.error('Lỗi xác thực gia sư:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi xác thực',
      error: error.message
    });
  }
};

/**
 * TỪ CHỐI XÁC THỰC GIA SƯ
 */
export const rejectTutor = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const { reason } = req.body;
    
    const connection = await pool.getConnection();
    
    // 1. Cập nhật trạng thái hồ sơ gia sư
    await connection.query(
      `UPDATE ho_so_gia_su 
       SET trang_thai = 'tu_choi' 
       WHERE nguoi_dung_id = ?`,
      [tutorId]
    );
    
    // 2. Lấy thông tin để gửi thông báo (TODO: implement notification)
    const [tutor] = await connection.query(
      `SELECT nd.ho_ten, nd.email 
       FROM nguoi_dung nd 
       WHERE nd.id = ?`,
      [tutorId]
    );
    
    connection.release();
    
    // TODO: Gửi email thông báo lý do từ chối
    console.log(`Từ chối gia sư ${tutor[0].ho_ten}: ${reason}`);
    
    res.json({
      success: true,
      message: `Đã từ chối xác thực cho ${tutor[0].ho_ten}`,
      data: { reason }
    });
  } catch (error) {
    console.error('Lỗi từ chối gia sư:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi từ chối',
      error: error.message
    });
  }
};

/**
 * LẤY DANH SÁCH TẤT CẢ NGƯỜI DÙNG
 */
export const getAllUsers = async (req, res) => {
  try {
    const { vai_tro, trang_thai, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT nd.id, nd.email, nd.vai_tro, nd.ho_ten, nd.so_dien_thoai, 
             nd.avatar_url, nd.trang_thai, nd.tao_luc
      FROM nguoi_dung nd
      WHERE 1=1
    `;
    const params = [];
    
    if (vai_tro) {
      query += ` AND nd.vai_tro = ?`;
      params.push(vai_tro);
    }
    
    if (trang_thai) {
      query += ` AND nd.trang_thai = ?`;
      params.push(trang_thai);
    }
    
    query += ` ORDER BY nd.tao_luc DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));
    
    const connection = await pool.getConnection();
    const [users] = await connection.query(query, params);
    
    // Count total
    let countQuery = `SELECT COUNT(*) as total FROM nguoi_dung WHERE 1=1`;
    const countParams = [];
    if (vai_tro) {
      countQuery += ` AND vai_tro = ?`;
      countParams.push(vai_tro);
    }
    if (trang_thai) {
      countQuery += ` AND trang_thai = ?`;
      countParams.push(trang_thai);
    }
    
    const [countResult] = await connection.query(countQuery, countParams);
    connection.release();
    
    res.json({
      success: true,
      data: {
        users,
        pagination: {
          total: countResult[0].total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(countResult[0].total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Lỗi lấy danh sách người dùng:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

/**
 * CẬP NHẬT TRẠNG THÁI NGƯỜI DÙNG
 */
export const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { trang_thai } = req.body;
    
    if (!['hoat_dong', 'tam_ngung', 'khoa'].includes(trang_thai)) {
      return res.status(400).json({
        success: false,
        message: 'Trạng thái không hợp lệ'
      });
    }
    
    const connection = await pool.getConnection();
    
    await connection.query(
      `UPDATE nguoi_dung SET trang_thai = ? WHERE id = ?`,
      [trang_thai, userId]
    );
    
    const [user] = await connection.query(
      `SELECT id, ho_ten, email, trang_thai FROM nguoi_dung WHERE id = ?`,
      [userId]
    );
    
    connection.release();
    
    res.json({
      success: true,
      message: `Đã cập nhật trạng thái người dùng`,
      data: user[0]
    });
  } catch (error) {
    console.error('Lỗi cập nhật trạng thái:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

/**
 * LẤY DANH SÁCH TẤT CẢ BÀI ĐĂNG (ADMIN)
 */
export const getAllPosts = async (req, res) => {
  try {
    const { trang_thai, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT 
        bd.id,
        bd.tieu_de,
        bd.mo_ta,
        bd.lop,
        bd.luong as hoc_phi,
        bd.dia_chi,
        bd.yeu_cau,
        bd.tan_suat as lich_hoc,
        bd.trang_thai,
        bd.tao_luc,
        bd.cap_nhat_luc,
        mh.ten_mon as mon_hoc,
        nd.id as phu_huynh_id,
        nd.ho_ten as phu_huynh_ten,
        nd.email as phu_huynh_email,
        nd.so_dien_thoai as phu_huynh_sdt,
        (SELECT COUNT(*) FROM don_ung_tuyen WHERE bai_dang_id = bd.id) as so_ung_tuyen
      FROM bai_dang bd
      INNER JOIN mon_hoc mh ON bd.mon_hoc_id = mh.id
      INNER JOIN nguoi_dung nd ON bd.phu_huynh_id = nd.id
      WHERE 1=1
    `;
    const params = [];
    
    if (trang_thai) {
      query += ` AND bd.trang_thai = ?`;
      params.push(trang_thai);
    }
    
    query += ` ORDER BY bd.tao_luc DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));
    
    const connection = await pool.getConnection();
    const [posts] = await connection.query(query, params);
    
    // Count total
    let countQuery = `SELECT COUNT(*) as total FROM bai_dang WHERE 1=1`;
    const countParams = [];
    if (trang_thai) {
      countQuery += ` AND trang_thai = ?`;
      countParams.push(trang_thai);
    }
    
    const [countResult] = await connection.query(countQuery, countParams);
    connection.release();
    
    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          total: countResult[0].total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(countResult[0].total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Lỗi lấy danh sách bài đăng:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

/**
 * CẬP NHẬT TRẠNG THÁI BÀI ĐĂNG
 */
export const updatePostStatus = async (req, res) => {
  try {
    const { postId } = req.params;
    const { trang_thai } = req.body;
    
    if (!['mo', 'dong', 'an'].includes(trang_thai)) {
      return res.status(400).json({
        success: false,
        message: 'Trạng thái không hợp lệ'
      });
    }
    
    const connection = await pool.getConnection();
    
    await connection.query(
      `UPDATE bai_dang SET trang_thai = ?, cap_nhat_luc = NOW() WHERE id = ?`,
      [trang_thai, postId]
    );
    
    const [post] = await connection.query(
      `SELECT id, tieu_de, trang_thai FROM bai_dang WHERE id = ?`,
      [postId]
    );
    
    connection.release();
    
    res.json({
      success: true,
      message: `Đã cập nhật trạng thái bài đăng`,
      data: post[0]
    });
  } catch (error) {
    console.error('Lỗi cập nhật trạng thái bài đăng:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

/**
 * LẤY THÔNG TIN CHI TIẾT GIA SƯ (ADMIN)
 */
export const getTutorDetail = async (req, res) => {
  try {
    const { tutorId } = req.params;
    
    const connection = await pool.getConnection();
    
    // Lấy thông tin cơ bản
    const [users] = await connection.query(
      `SELECT nd.*, 
              hsv.ma_sinh_vien, hsv.ma_lop, hsv.khoa, hsv.nganh_hoc, hsv.da_xac_thuc,
              hsg.tieu_de, hsg.gioi_thieu, hsg.kinh_nghiem, hsg.thanh_tich, 
              hsg.hoc_phi_gio, hsg.dia_diem_day, hsg.trang_thai as gia_su_status
       FROM nguoi_dung nd
       LEFT JOIN ho_so_sinh_vien hsv ON nd.id = hsv.nguoi_dung_id
       LEFT JOIN ho_so_gia_su hsg ON nd.id = hsg.nguoi_dung_id
       WHERE nd.id = ? AND nd.vai_tro = 'gia_su'`,
      [tutorId]
    );
    
    if (users.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy gia sư'
      });
    }
    
    const tutor = users[0];
    
    // Lấy môn học
    const [subjects] = await connection.query(
      `SELECT mh.* FROM mon_hoc mh
       JOIN gia_su_mon_hoc gsmh ON mh.id = gsmh.mon_hoc_id
       WHERE gsmh.gia_su_id = ?`,
      [tutorId]
    );
    
    // Lấy đơn ứng tuyển
    const [applications] = await connection.query(
      `SELECT dut.*, bd.tieu_de as bai_dang_tieu_de, bd.trang_thai as bai_dang_status
       FROM don_ung_tuyen dut
       JOIN bai_dang bd ON dut.bai_dang_id = bd.id
       WHERE dut.gia_su_id = ?
       ORDER BY dut.tao_luc DESC
       LIMIT 10`,
      [tutorId]
    );
    
    connection.release();
    
    res.json({
      success: true,
      data: {
        ...tutor,
        mon_hoc: subjects,
        don_ung_tuyen: applications
      }
    });
  } catch (error) {
    console.error('Lỗi lấy thông tin gia sư:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

/**
 * LẤY THÔNG TIN CHI TIẾT USER (cho admin xem)
 */
export const getUserDetailById = async (req, res) => {
  let connection;
  try {
    const { id } = req.params;
    console.log('📋 [getUserDetailById] Fetching user with ID:', id);
    
    connection = await pool.getConnection();
    
    // Lấy thông tin user cơ bản
    const [users] = await connection.query(`
      SELECT 
        nd.id,
        nd.ho_ten,
        nd.email,
        nd.so_dien_thoai,
        nd.avatar_url,
        nd.vai_tro,
        nd.trang_thai,
        nd.tao_luc,
        nd.cap_nhat_luc
      FROM nguoi_dung nd
      WHERE nd.id = ?
    `, [id]);
    
    console.log('👤 Found users:', users.length);
    
    if (users.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }
    
    const user = users[0];
    console.log('✅ User basic info:', user.ho_ten, user.vai_tro);
    
    // Lấy thông tin sinh viên (nếu có)
    const [studentInfo] = await connection.query(`
      SELECT 
        ma_sinh_vien,
        ma_lop,
        khoa,
        nganh_hoc,
        nam_hoc,
        da_xac_thuc
      FROM ho_so_sinh_vien
      WHERE nguoi_dung_id = ?
    `, [id]);
    
    console.log('📚 Student info found:', studentInfo.length);
    
    if (studentInfo.length > 0) {
      Object.assign(user, studentInfo[0]);
    }
    
    // Nếu là gia sư, lấy thêm thông tin gia sư
    if (user.vai_tro === 'gia_su') {
      console.log('👨‍🏫 User is tutor, fetching tutor info...');
      
      const [tutorInfo] = await connection.query(`
        SELECT 
          tieu_de,
          gioi_thieu,
          hoc_phi_gio,
          hinh_thuc,
          kinh_nghiem,
          danh_gia_trung_binh,
          so_danh_gia,
          trang_thai as tutor_status
        FROM ho_so_gia_su
        WHERE nguoi_dung_id = ?
      `, [id]);
      
      console.log('📋 Tutor info found:', tutorInfo.length);
      
      if (tutorInfo.length > 0) {
        Object.assign(user, tutorInfo[0]);
      }
      
      // Lấy môn học
      const [subjects] = await connection.query(`
        SELECT mh.ten_mon
        FROM mon_hoc mh
        INNER JOIN gia_su_mon_hoc gsmh ON mh.id = gsmh.mon_hoc_id
        WHERE gsmh.gia_su_id = ?
      `, [id]);
      
      console.log('📖 Subjects found:', subjects.length);
      user.mon_hoc = subjects.map(s => s.ten_mon);
    }
    
    connection.release();
    console.log('✅ Successfully fetched user detail');
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('❌ [getUserDetailById] Error:', error);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);
    
    if (connection) {
      connection.release();
    }
    
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};
