import pool from './config/database.js';

const clearAllData = async () => {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║        🗑️  XÓA TOÀN BỘ DỮ LIỆU TRONG DATABASE           ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  
  try {
    const connection = await pool.getConnection();
    await connection.query("SET NAMES utf8mb4");
    
    console.log('⚠️  CẢNH BÁO: Đang xóa toàn bộ dữ liệu...\n');
    
    // Tắt foreign key check
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Xóa dữ liệu theo thứ tự (bảng con trước, bảng cha sau)
    console.log('🗑️  Đang xóa dữ liệu...');
    
    await connection.query('DELETE FROM danh_gia');
    console.log('   ✅ Đã xóa bảng danh_gia');
    
    await connection.query('DELETE FROM don_ung_tuyen');
    console.log('   ✅ Đã xóa bảng don_ung_tuyen');
    
    await connection.query('DELETE FROM bai_dang');
    console.log('   ✅ Đã xóa bảng bai_dang');
    
    await connection.query('DELETE FROM gia_su_mon_hoc');
    console.log('   ✅ Đã xóa bảng gia_su_mon_hoc');
    
    await connection.query('DELETE FROM ho_so_gia_su');
    console.log('   ✅ Đã xóa bảng ho_so_gia_su');
    
    await connection.query('DELETE FROM ho_so_sinh_vien');
    console.log('   ✅ Đã xóa bảng ho_so_sinh_vien');
    
    await connection.query("DELETE FROM nguoi_dung WHERE email != 'admin@tutorlink.vn'");
    console.log('   ✅ Đã xóa bảng nguoi_dung (giữ admin)');
    
    // Bật lại foreign key check
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    
    // Kiểm tra kết quả
    const [counts] = await connection.query(`
      SELECT 
        (SELECT COUNT(*) FROM nguoi_dung) as users,
        (SELECT COUNT(*) FROM ho_so_sinh_vien) as students,
        (SELECT COUNT(*) FROM ho_so_gia_su) as tutors,
        (SELECT COUNT(*) FROM bai_dang) as posts,
        (SELECT COUNT(*) FROM don_ung_tuyen) as applications,
        (SELECT COUNT(*) FROM danh_gia) as reviews,
        (SELECT COUNT(*) FROM gia_su_mon_hoc) as tutor_subjects
    `);
    
    const c = counts[0];
    
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║                   📊 KẾT QUẢ                            ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
    console.log(`👥 Người dùng còn lại: ${c.users} (admin)`);
    console.log(`🎓 Hồ sơ sinh viên: ${c.students}`);
    console.log(`📚 Hồ sơ gia sư: ${c.tutors}`);
    console.log(`📝 Bài đăng: ${c.posts}`);
    console.log(`📋 Đơn ứng tuyển: ${c.applications}`);
    console.log(`⭐ Đánh giá: ${c.reviews}`);
    console.log(`🔖 Môn học gia sư: ${c.tutor_subjects}`);
    
    console.log('\n✅ ĐÃ XÓA TOÀN BỘ DỮ LIỆU THÀNH CÔNG!\n');
    
    connection.release();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

clearAllData();
