import pool from './config/database.js';

const checkSystemData = async () => {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║        🔍 KIỂM TRA TOÀN BỘ DỮ LIỆU HỆ THỐNG           ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  
  try {
    const connection = await pool.getConnection();
    await connection.query("SET NAMES utf8mb4");
    
    // 1. Kiểm tra người dùng
    console.log('1️⃣  NGƯỜI DÙNG');
    console.log('─────────────────────────────────────────────────────────');
    const [users] = await connection.query(`
      SELECT vai_tro, COUNT(*) as so_luong, 
             SUM(CASE WHEN trang_thai = 'hoat_dong' THEN 1 ELSE 0 END) as hoat_dong
      FROM nguoi_dung 
      GROUP BY vai_tro
    `);
    users.forEach(u => {
      console.log(`  ${u.vai_tro.padEnd(15)} : ${u.so_luong} tài khoản (${u.hoat_dong} hoạt động)`);
    });
    
    // 2. Kiểm tra hồ sơ sinh viên
    console.log('\n2️⃣  HỒ SƠ SINH VIÊN');
    console.log('─────────────────────────────────────────────────────────');
    const [students] = await connection.query(`
      SELECT COUNT(*) as tong, 
             SUM(CASE WHEN da_xac_thuc = 1 THEN 1 ELSE 0 END) as da_xac_thuc
      FROM ho_so_sinh_vien
    `);
    console.log(`  Tổng số: ${students[0].tong} | Đã xác thực: ${students[0].da_xac_thuc}`);
    
    // 3. Kiểm tra hồ sơ gia sư
    console.log('\n3️⃣  HỒ SƠ GIA SƯ');
    console.log('─────────────────────────────────────────────────────────');
    const [tutors] = await connection.query(`
      SELECT trang_thai, COUNT(*) as so_luong
      FROM ho_so_gia_su
      GROUP BY trang_thai
    `);
    tutors.forEach(t => {
      console.log(`  ${t.trang_thai.padEnd(15)} : ${t.so_luong} gia sư`);
    });
    
    // 4. Kiểm tra môn học
    console.log('\n4️⃣  MÔN HỌC');
    console.log('─────────────────────────────────────────────────────────');
    const [subjects] = await connection.query(`
      SELECT COUNT(*) as tong FROM mon_hoc
    `);
    console.log(`  Tổng số môn học: ${subjects[0].tong}`);
    
    const [tutorSubjects] = await connection.query(`
      SELECT COUNT(DISTINCT gia_su_id) as tutors_with_subjects
      FROM gia_su_mon_hoc
    `);
    console.log(`  Gia sư đã chọn môn: ${tutorSubjects[0].tutors_with_subjects}`);
    
    // 5. Kiểm tra bài đăng
    console.log('\n5️⃣  BÀI ĐĂNG TÌM GIA SƯ');
    console.log('─────────────────────────────────────────────────────────');
    const [posts] = await connection.query(`
      SELECT trang_thai, COUNT(*) as so_luong
      FROM bai_dang
      GROUP BY trang_thai
    `);
    if (posts.length > 0) {
      posts.forEach(p => {
        console.log(`  ${p.trang_thai.padEnd(15)} : ${p.so_luong} bài`);
      });
    } else {
      console.log('  ⚠️  Chưa có bài đăng nào');
    }
    
    // 6. Kiểm tra đơn ứng tuyển
    console.log('\n6️⃣  ĐƠN ỨNG TUYỂN');
    console.log('─────────────────────────────────────────────────────────');
    const [applications] = await connection.query(`
      SELECT trang_thai, COUNT(*) as so_luong
      FROM don_ung_tuyen
      GROUP BY trang_thai
    `);
    if (applications.length > 0) {
      applications.forEach(a => {
        console.log(`  ${a.trang_thai.padEnd(15)} : ${a.so_luong} đơn`);
      });
    } else {
      console.log('  ⚠️  Chưa có đơn ứng tuyển nào');
    }
    
    // 7. Kiểm tra đánh giá
    console.log('\n7️⃣  ĐÁNH GIÁ GIA SƯ');
    console.log('─────────────────────────────────────────────────────────');
    const [reviews] = await connection.query(`
      SELECT COUNT(*) as tong, 
             ROUND(AVG(diem_so), 1) as diem_trung_binh
      FROM danh_gia
    `);
    if (reviews[0].tong > 0) {
      console.log(`  Tổng số: ${reviews[0].tong} đánh giá`);
      console.log(`  Điểm TB: ${reviews[0].diem_trung_binh}/5.0 ⭐`);
    } else {
      console.log('  ⚠️  Chưa có đánh giá nào');
    }
    
    // 8. Kiểm tra encoding của dữ liệu mẫu
    console.log('\n8️⃣  KIỂM TRA ENCODING (5 GIA SƯ ĐẦU TIÊN)');
    console.log('─────────────────────────────────────────────────────────');
    const [sampleTutors] = await connection.query(`
      SELECT nd.ho_ten, hsv.khoa, hsv.nganh_hoc, hsg.tieu_de
      FROM nguoi_dung nd
      JOIN ho_so_sinh_vien hsv ON nd.id = hsv.nguoi_dung_id
      JOIN ho_so_gia_su hsg ON nd.id = hsg.nguoi_dung_id
      WHERE nd.vai_tro = 'gia_su'
      LIMIT 5
    `);
    sampleTutors.forEach((t, i) => {
      console.log(`  ${i+1}. ${t.ho_ten} - ${t.nganh_hoc}`);
      console.log(`     ${t.tieu_de}`);
    });
    
    // 9. Test tài khoản
    console.log('\n9️⃣  TÀI KHOẢN TEST');
    console.log('─────────────────────────────────────────────────────────');
    const testAccounts = [
      { email: 'admin@tutorlink.vn', role: 'ADMIN' },
      { email: '1101210001@st.tvu.edu.vn', role: 'GIA SƯ' }
    ];
    
    for (const acc of testAccounts) {
      const [user] = await connection.query(
        'SELECT email, ho_ten, vai_tro, trang_thai FROM nguoi_dung WHERE email = ?',
        [acc.email]
      );
      if (user.length > 0) {
        console.log(`  ✅ ${acc.role.padEnd(10)} : ${user[0].email} (${user[0].trang_thai})`);
      } else {
        console.log(`  ❌ ${acc.role.padEnd(10)} : KHÔNG TÌM THẤY`);
      }
    }
    
    // 10. Tổng kết
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║                     📊 TỔNG KẾT                         ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
    
    const [totalUsers] = await connection.query('SELECT COUNT(*) as total FROM nguoi_dung');
    const [totalTutors] = await connection.query('SELECT COUNT(*) as total FROM ho_so_gia_su');
    const [totalSubjects] = await connection.query('SELECT COUNT(*) as total FROM mon_hoc');
    
    console.log(`  👥 Tổng người dùng    : ${totalUsers[0].total}`);
    console.log(`  🎓 Tổng gia sư        : ${totalTutors[0].total}`);
    console.log(`  📚 Tổng môn học       : ${totalSubjects[0].total}`);
    
    // Kiểm tra lỗi tiềm năng
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║              ⚠️  PHÁT HIỆN VẤN ĐỀ                       ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
    
    let issueCount = 0;
    
    // Check user không có hồ sơ
    const [orphanUsers] = await connection.query(`
      SELECT COUNT(*) as count 
      FROM nguoi_dung nd
      LEFT JOIN ho_so_gia_su hsg ON nd.id = hsg.nguoi_dung_id
      WHERE nd.vai_tro = 'gia_su' AND hsg.id IS NULL
    `);
    if (orphanUsers[0].count > 0) {
      console.log(`  ❌ ${orphanUsers[0].count} gia sư không có hồ sơ`);
      issueCount++;
    }
    
    // Check gia sư không có môn học
    const [tutorsWithoutSubjects] = await connection.query(`
      SELECT COUNT(*) as count
      FROM ho_so_gia_su hsg
      LEFT JOIN gia_su_mon_hoc gsmh ON hsg.id = gsmh.gia_su_id
      WHERE gsmh.mon_hoc_id IS NULL
    `);
    if (tutorsWithoutSubjects[0].count > 0) {
      console.log(`  ⚠️  ${tutorsWithoutSubjects[0].count} gia sư chưa chọn môn học`);
      issueCount++;
    }
    
    if (posts.length === 0) {
      console.log(`  ⚠️  Chưa có bài đăng nào (cần seed data)`);
      issueCount++;
    }
    
    if (issueCount === 0) {
      console.log('  ✅ Không phát hiện vấn đề nào!');
    }
    
    connection.release();
    console.log('\n✅ HOÀN TẤT KIỂM TRA!\n');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

checkSystemData();
