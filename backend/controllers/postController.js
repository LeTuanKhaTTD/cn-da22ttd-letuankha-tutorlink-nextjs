import pool from '../config/database.js';

/**
 * Map grade to education level
 */
const mapGradeToLevel = (grade) => {
  if (!grade) return 'Không xác định';
  
  const normalized = grade.toString().toLowerCase().replace(/[^0-9]/g, '');
  const gradeNum = parseInt(normalized);
  
  if (gradeNum >= 1 && gradeNum <= 5) return 'Tiểu học';
  if (gradeNum >= 6 && gradeNum <= 9) return 'THCS';
  if (gradeNum >= 10 && gradeNum <= 12) return 'THPT';
  
  // Check for keywords
  if (grade.toLowerCase().includes('tiểu học')) return 'Tiểu học';
  if (grade.toLowerCase().includes('thcs')) return 'THCS';
  if (grade.toLowerCase().includes('thpt')) return 'THPT';
  if (grade.toLowerCase().includes('đại học') || grade.toLowerCase().includes('sinh viên')) return 'Đại học';
  
  return 'Đại học'; // Default for programming courses, etc.
};

/**
 * Lấy danh sách tất cả bài đăng tìm gia sư
 */
export const getAllPosts = async (req, res) => {
  try {
    const query = `
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
        mh.ten_mon as mon_hoc,
        nd.ho_ten,
        nd.so_dien_thoai,
        (SELECT COUNT(*) FROM don_ung_tuyen WHERE bai_dang_id = bd.id) as so_ung_tuyen
      FROM bai_dang bd
      INNER JOIN mon_hoc mh ON bd.mon_hoc_id = mh.id
      INNER JOIN nguoi_dung nd ON bd.phu_huynh_id = nd.id
      WHERE bd.trang_thai = 'mo'
      ORDER BY bd.tao_luc DESC
    `;
    
    const [posts] = await pool.query(query);
    
    // Transform data to match frontend expectations
    const transformedPosts = posts.map(post => ({
      ...post,
      hinh_thuc: 'offline', // Default mode since not in database
      cap_hoc: mapGradeToLevel(post.lop)
    }));
    
    res.json({
      success: true,
      data: transformedPosts,
      count: posts.length
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách bài đăng:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách bài đăng',
      error: error.message
    });
  }
};

/**
 * Lấy chi tiết một bài đăng
 */
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
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
        bd.so_luot_xem,
        mh.ten_mon as mon_hoc,
        nd.ho_ten,
        nd.so_dien_thoai,
        nd.email,
        (SELECT COUNT(*) FROM don_ung_tuyen WHERE bai_dang_id = bd.id) as so_ung_tuyen
      FROM bai_dang bd
      INNER JOIN mon_hoc mh ON bd.mon_hoc_id = mh.id
      INNER JOIN nguoi_dung nd ON bd.phu_huynh_id = nd.id
      WHERE bd.id = ?
    `;
    
    const [posts] = await pool.query(query, [id]);
    
    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy bài đăng'
      });
    }
    
    // Increment view count
    await pool.query('UPDATE bai_dang SET so_luot_xem = so_luot_xem + 1 WHERE id = ?', [id]);
    
    const post = {
      ...posts[0],
      hinh_thuc: 'offline',
      cap_hoc: mapGradeToLevel(posts[0].lop)
    };
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết bài đăng:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy chi tiết bài đăng',
      error: error.message
    });
  }
};

/**
 * Lấy danh sách bài đăng của phụ huynh
 */
export const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    
    const query = `
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
        mh.ten_mon as mon_hoc,
        (SELECT COUNT(*) FROM don_ung_tuyen WHERE bai_dang_id = bd.id) as so_ung_tuyen
      FROM bai_dang bd
      INNER JOIN mon_hoc mh ON bd.mon_hoc_id = mh.id
      WHERE bd.phu_huynh_id = ?
      ORDER BY bd.tao_luc DESC
    `;
    
    const [posts] = await pool.query(query, [userId]);
    
    const transformedPosts = posts.map(post => ({
      ...post,
      hinh_thuc: 'offline',
      cap_hoc: post.lop
    }));
    
    res.json({
      success: true,
      data: transformedPosts
    });
  } catch (error) {
    console.error('Lỗi khi lấy bài đăng của tôi:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách bài đăng',
      error: error.message
    });
  }
};

/**
 * Tạo bài đăng mới
 */
export const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tieu_de, mo_ta, mon_hoc_id, lop, luong, dia_chi, yeu_cau, tan_suat } = req.body;
    
    // Generate UUID for post ID
    const postId = `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const query = `
      INSERT INTO bai_dang (
        id, phu_huynh_id, mon_hoc_id, tieu_de, lop, luong, 
        dia_chi, mo_ta, yeu_cau, tan_suat, trang_thai
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'mo')
    `;
    
    await pool.query(query, [
      postId, userId, mon_hoc_id, tieu_de, lop, luong,
      dia_chi, mo_ta, yeu_cau, tan_suat
    ]);
    
    res.status(201).json({
      success: true,
      message: 'Tạo bài đăng thành công',
      data: { id: postId }
    });
  } catch (error) {
    console.error('Lỗi khi tạo bài đăng:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo bài đăng',
      error: error.message
    });
  }
};

/**
 * Cập nhật bài đăng
 */
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updates = req.body;
    
    // Verify ownership
    const [posts] = await pool.query('SELECT phu_huynh_id FROM bai_dang WHERE id = ?', [id]);
    if (posts.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài đăng' });
    }
    if (posts[0].phu_huynh_id !== userId) {
      return res.status(403).json({ success: false, message: 'Không có quyền chỉnh sửa' });
    }
    
    // Build update query
    const allowedFields = ['tieu_de', 'mo_ta', 'lop', 'luong', 'dia_chi', 'yeu_cau', 'tan_suat', 'trang_thai'];
    const updateFields = [];
    const values = [];
    
    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    });
    
    if (updateFields.length === 0) {
      return res.status(400).json({ success: false, message: 'Không có trường nào để cập nhật' });
    }
    
    values.push(id);
    const query = `UPDATE bai_dang SET ${updateFields.join(', ')} WHERE id = ?`;
    
    await pool.query(query, values);
    
    res.json({
      success: true,
      message: 'Cập nhật bài đăng thành công'
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật bài đăng:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật bài đăng',
      error: error.message
    });
  }
};

/**
 * Xóa bài đăng
 */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // Verify ownership
    const [posts] = await pool.query('SELECT phu_huynh_id FROM bai_dang WHERE id = ?', [id]);
    if (posts.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài đăng' });
    }
    if (posts[0].phu_huynh_id !== userId) {
      return res.status(403).json({ success: false, message: 'Không có quyền xóa' });
    }
    
    // Soft delete by setting status to 'dong'
    await pool.query("UPDATE bai_dang SET trang_thai = 'dong' WHERE id = ?", [id]);
    
    res.json({
      success: true,
      message: 'Xóa bài đăng thành công'
    });
  } catch (error) {
    console.error('Lỗi khi xóa bài đăng:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa bài đăng',
      error: error.message
    });
  }
};
