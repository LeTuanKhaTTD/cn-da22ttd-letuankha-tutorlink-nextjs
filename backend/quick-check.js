import pool from './config/database.js';

const quickCheck = async () => {
  try {
    const connection = await pool.getConnection();
    
    console.log('🔍 Kiểm tra nhanh hệ thống...\n');
    
    // 1. Database connection
    console.log('✅ MySQL: Kết nối thành công');
    
    // 2. Count data
    const [counts] = await connection.query(`
      SELECT 
        (SELECT COUNT(*) FROM nguoi_dung) as users,
        (SELECT COUNT(*) FROM ho_so_gia_su WHERE trang_thai = 'hoat_dong') as tutors,
        (SELECT COUNT(*) FROM bai_dang WHERE trang_thai = 'mo') as posts,
        (SELECT COUNT(*) FROM don_ung_tuyen) as applications,
        (SELECT COUNT(*) FROM danh_gia) as reviews
    `);
    
    const c = counts[0];
    
    console.log('✅ Dữ liệu:');
    console.log(`   👥 Người dùng: ${c.users}`);
    console.log(`   🎓 Gia sư: ${c.tutors}`);
    console.log(`   📢 Bài đăng: ${c.posts}`);
    console.log(`   📝 Đơn ứng tuyển: ${c.applications}`);
    console.log(`   ⭐ Đánh giá: ${c.reviews}`);
    
    // 3. Check test accounts
    const [admin] = await connection.query(`
      SELECT email FROM nguoi_dung WHERE email = 'admin@tutorlink.vn' AND trang_thai = 'hoat_dong'
    `);
    console.log(`\n✅ Tài khoản Admin: ${admin.length > 0 ? 'OK' : '❌ KHÔNG TÌM THẤY'}`);
    
    const [tutor] = await connection.query(`
      SELECT email FROM nguoi_dung WHERE email = '1101210001@st.tvu.edu.vn' AND trang_thai = 'hoat_dong'
    `);
    console.log(`✅ Tài khoản Gia sư: ${tutor.length > 0 ? 'OK' : '❌ KHÔNG TÌM THẤY'}`);
    
    // 4. Check encoding
    const [nameCheck] = await connection.query(`
      SELECT ho_ten FROM nguoi_dung WHERE email = '1101210001@st.tvu.edu.vn'
    `);
    const isUtf8Ok = nameCheck[0].ho_ten.includes('Nguyễn');
    console.log(`\n✅ Encoding UTF-8: ${isUtf8Ok ? 'OK' : '❌ LỖI'}`);
    
    connection.release();
    
    // 5. Final verdict
    const allGood = c.users > 0 && c.tutors > 0 && c.posts > 0 && admin.length > 0 && tutor.length > 0 && isUtf8Ok;
    
    console.log('\n' + '═'.repeat(50));
    if (allGood) {
      console.log('✅ HỆ THỐNG SẴN SÀNG! Có thể chạy npm run dev');
    } else {
      console.log('⚠️  CÓ VẤN ĐỀ! Chạy: node backend/auto-setup-complete.js');
    }
    console.log('═'.repeat(50) + '\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    console.log('\n💡 Hướng dẫn fix:');
    console.log('   1. Kiểm tra MySQL đang chạy');
    console.log('   2. Chạy: node backend/auto-setup-complete.js');
    process.exit(1);
  }
};

quickCheck();
