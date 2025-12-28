import pool from '../config/database.js';

/**
 * Lấy tất cả đơn ứng tuyển (for admin)
 */
export const getAllApplications = async (req, res) => {
  try {
    const query = `
      SELECT 
        dut.id,
        dut.gia_su_id,
        dut.bai_dang_id,
        dut.loi_nhan,
        dut.trang_thai,
        dut.ghi_chu_phu_huynh,
        dut.tao_luc,
        nd.ho_ten as ten_gia_su,
        nd.so_dien_thoai as sdt_gia_su,
        bd.tieu_de as ten_bai_dang
      FROM don_ung_tuyen dut
      INNER JOIN nguoi_dung nd ON dut.gia_su_id = nd.id
      INNER JOIN bai_dang bd ON dut.bai_dang_id = bd.id
      ORDER BY dut.tao_luc DESC
    `;
    
    const [applications] = await pool.query(query);
    
    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn ứng tuyển:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách đơn ứng tuyển',
      error: error.message
    });
  }
};

/**
 * Lấy đơn ứng tuyển của gia sư
 */
export const getMyApplications = async (req, res) => {
  try {
    const tutorId = req.user.id;
    
    const query = `
      SELECT 
        dut.id,
        dut.bai_dang_id,
        dut.loi_nhan,
        dut.trang_thai,
        dut.ghi_chu_phu_huynh,
        dut.tao_luc,
        bd.tieu_de,
        bd.mo_ta,
        bd.lop,
        bd.luong as hoc_phi,
        bd.dia_chi,
        mh.ten_mon as mon_hoc,
        nd.ho_ten as ten_phu_huynh,
        nd.so_dien_thoai as sdt_phu_huynh
      FROM don_ung_tuyen dut
      INNER JOIN bai_dang bd ON dut.bai_dang_id = bd.id
      INNER JOIN mon_hoc mh ON bd.mon_hoc_id = mh.id
      INNER JOIN nguoi_dung nd ON bd.phu_huynh_id = nd.id
      WHERE dut.gia_su_id = ?
      ORDER BY dut.tao_luc DESC
    `;
    
    const [applications] = await pool.query(query, [tutorId]);
    
    const transformedApplications = applications.map(app => ({
      ...app,
      cap_hoc: app.lop,
      hinh_thuc: 'offline'
    }));
    
    res.json({
      success: true,
      data: transformedApplications
    });
  } catch (error) {
    console.error('Lỗi khi lấy đơn ứng tuyển của gia sư:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy đơn ứng tuyển',
      error: error.message
    });
  }
};

/**
 * Lấy đơn ứng tuyển cho một bài đăng (phụ huynh xem)
 */
export const getApplicationsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    
    // Verify ownership
    const [posts] = await pool.query('SELECT phu_huynh_id FROM bai_dang WHERE id = ?', [postId]);
    if (posts.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài đăng' });
    }
    if (posts[0].phu_huynh_id !== userId) {
      return res.status(403).json({ success: false, message: 'Không có quyền xem' });
    }
    
    const query = `
      SELECT 
        dut.id,
        dut.gia_su_id,
        dut.loi_nhan,
        dut.trang_thai,
        dut.tao_luc,
        nd.ho_ten as ten_gia_su,
        nd.so_dien_thoai as sdt_gia_su,
        nd.email as email_gia_su,
        hsg.tieu_de,
        hsg.hoc_phi_gio,
        hsg.danh_gia_trung_binh,
        hsg.so_danh_gia
      FROM don_ung_tuyen dut
      INNER JOIN nguoi_dung nd ON dut.gia_su_id = nd.id
      LEFT JOIN ho_so_gia_su hsg ON nd.id = hsg.nguoi_dung_id
      WHERE dut.bai_dang_id = ?
      ORDER BY dut.tao_luc DESC
    `;
    
    const [applications] = await pool.query(query, [postId]);
    
    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Lỗi khi lấy đơn ứng tuyển của bài đăng:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy đơn ứng tuyển',
      error: error.message
    });
  }
};

/**
 * Tạo đơn ứng tuyển mới
 */
export const createApplication = async (req, res) => {
  try {
    const tutorId = req.user.id;
    const { bai_dang_id, loi_nhan } = req.body;
    
    // Check if already applied
    const [existing] = await pool.query(
      'SELECT id FROM don_ung_tuyen WHERE gia_su_id = ? AND bai_dang_id = ?',
      [tutorId, bai_dang_id]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Bạn đã ứng tuyển bài đăng này rồi'
      });
    }
    
    // Generate UUID for application
    const applicationId = `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const query = `
      INSERT INTO don_ung_tuyen (id, gia_su_id, bai_dang_id, loi_nhan, trang_thai)
      VALUES (?, ?, ?, ?, 'cho')
    `;
    
    await pool.query(query, [applicationId, tutorId, bai_dang_id, loi_nhan]);
    
    res.status(201).json({
      success: true,
      message: 'Ứng tuyển thành công',
      data: { id: applicationId }
    });
  } catch (error) {
    console.error('Lỗi khi tạo đơn ứng tuyển:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi ứng tuyển',
      error: error.message
    });
  }
};

/**
 * Cập nhật trạng thái đơn ứng tuyển (phụ huynh chấp nhận/từ chối)
 */
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { trang_thai, ghi_chu } = req.body;
    
    // Verify ownership through post
    const [applications] = await pool.query(`
      SELECT dut.*, bd.phu_huynh_id
      FROM don_ung_tuyen dut
      INNER JOIN bai_dang bd ON dut.bai_dang_id = bd.id
      WHERE dut.id = ?
    `, [id]);
    
    if (applications.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn ứng tuyển' });
    }
    
    if (applications[0].phu_huynh_id !== userId) {
      return res.status(403).json({ success: false, message: 'Không có quyền cập nhật' });
    }
    
    const query = `
      UPDATE don_ung_tuyen 
      SET trang_thai = ?, ghi_chu_phu_huynh = ?
      WHERE id = ?
    `;
    
    await pool.query(query, [trang_thai, ghi_chu || null, id]);
    
    res.json({
      success: true,
      message: 'Cập nhật trạng thái thành công'
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật đơn ứng tuyển:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi cập nhật đơn ứng tuyển',
      error: error.message
    });
  }
};
