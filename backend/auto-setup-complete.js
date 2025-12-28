import pool from './config/database.js';
import bcrypt from 'bcryptjs';

const autoSetupComplete = async () => {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     🚀 TỰ ĐỘNG THIẾT LẬP DỮ LIỆU ĐẦY ĐỦ               ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
  
  try {
    const connection = await pool.getConnection();
    await connection.query("SET NAMES utf8mb4");
    
    // 1. Kiểm tra và tạo đơn ứng tuyển
    console.log('📝 Đang tạo đơn ứng tuyển...');
    
    // Xóa dữ liệu cũ
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('DELETE FROM danh_gia');
    await connection.query('DELETE FROM don_ung_tuyen');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    
    const [posts] = await connection.query('SELECT id FROM bai_dang LIMIT 5');
    const [tutors] = await connection.query('SELECT id FROM ho_so_gia_su LIMIT 10');
    
    if (posts.length > 0 && tutors.length > 0) {
      
      const statusList = ['cho', 'chap_nhan', 'tu_choi'];
      let createdCount = 0;
      
      // Tạo 15 đơn ứng tuyển (mỗi gia sư ứng tuyển vào các bài khác nhau)
      for (let i = 0; i < tutors.length && createdCount < 15; i++) {
        for (let j = 0; j < posts.length && createdCount < 15; j++) {
          // Tránh duplicate
          if ((i + j) % 2 === 0) {
            const status = statusList[Math.floor(Math.random() * statusList.length)];
            
            await connection.query(
              `INSERT INTO don_ung_tuyen (id, bai_dang_id, gia_su_id, loi_nhan, trang_thai) 
               VALUES (UUID(), ?, ?, ?, ?)`,
              [
                posts[j].id,
                tutors[i].id,
                `Xin chào! Em là gia sư có kinh nghiệm ${1 + (i % 3)} năm. Em rất quan tâm đến bài đăng của quý phụ huynh và mong muốn được đồng hành cùng con học tập tốt hơn.`,
                status
              ]
            );
            createdCount++;
          }
        }
      }
      console.log(`✅ Đã tạo ${createdCount} đơn ứng tuyển`);
    }
    
    // 2. Tạo đánh giá cho gia sư
    console.log('⭐ Đang tạo đánh giá cho gia sư...');
    const [tutorList] = await connection.query(`
      SELECT hsg.id, nd.id as nguoi_dung_id, nd.ho_ten
      FROM ho_so_gia_su hsg
      JOIN nguoi_dung nd ON hsg.nguoi_dung_id = nd.id
      LIMIT 10
    `);
    
    const [parents] = await connection.query(`
      SELECT id FROM nguoi_dung WHERE vai_tro = 'phu_huynh' LIMIT 8
    `);
    
    if (tutorList.length > 0 && parents.length > 0) {
      
      const reviews = [
        'Gia sư dạy rất tận tâm, con em tiến bộ rõ rệt!',
        'Thầy/cô giảng dạy dễ hiểu, phương pháp hay!',
        'Rất hài lòng với gia sư này!',
        'Gia sư nhiệt tình, đúng giờ, chuyên nghiệp!',
        'Con em thích học với thầy/cô lắm!',
        'Điểm của con đã tăng đáng kể sau 2 tháng học!',
        'Gia sư giảng bài kỹ, kiên nhẫn với con!',
        'Rất đáng giá! Sẽ tiếp tục thuê gia sư này!'
      ];
      
      let reviewCount = 0;
      for (let i = 0; i < tutorList.length; i++) {
        const numReviews = 2 + Math.floor(Math.random() * 3); // 2-4 đánh giá/gia sư
        
        for (let j = 0; j < numReviews; j++) {
          const parentIndex = (i + j) % parents.length;
          const rating = 4 + Math.random(); // 4.0 - 5.0
          const reviewText = reviews[Math.floor(Math.random() * reviews.length)];
          
          await connection.query(
            `INSERT INTO danh_gia (id, gia_su_id, phu_huynh_id, diem_so, nhan_xet) 
             VALUES (UUID(), ?, ?, ?, ?)`,
            [tutorList[i].id, parents[parentIndex].id, Math.floor(rating), reviewText]
          );
          reviewCount++;
        }
        
        // Cập nhật điểm trung bình cho gia sư
        const [avgRating] = await connection.query(
          `SELECT AVG(diem_so) as avg_rating, COUNT(*) as count 
           FROM danh_gia WHERE gia_su_id = ?`,
          [tutorList[i].id]
        );
        
        await connection.query(
          `UPDATE ho_so_gia_su 
           SET danh_gia_trung_binh = ?, so_danh_gia = ? 
           WHERE id = ?`,
          [avgRating[0].avg_rating, avgRating[0].count, tutorList[i].id]
        );
      }
      console.log(`✅ Đã tạo ${reviewCount} đánh giá`);
    }
    
    // 3. Tạo thêm bài đăng nếu cần
    console.log('📢 Đang kiểm tra bài đăng...');
    const [postCount] = await connection.query('SELECT COUNT(*) as count FROM bai_dang');
    
    if (postCount[0].count < 10) {
      const [monHocs] = await connection.query('SELECT id FROM mon_hoc LIMIT 10');
      const formats = ['offline', 'online'];
      
      const needPosts = 10 - postCount[0].count;
      
      for (let i = 0; i < needPosts && i < monHocs.length; i++) {
        const parentIndex = i % parents.length;
        const lop = ['6', '7', '8', '9', '10', '11', '12'][Math.floor(Math.random() * 7)];
        
        await connection.query(
          `INSERT INTO bai_dang (id, phu_huynh_id, mon_hoc_id, tieu_de, lop, luong, dia_chi, mo_ta, tan_suat, trang_thai) 
           VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, 'mo')`,
          [
            parents[parentIndex].id,
            monHocs[i].id,
            `Tìm gia sư dạy lớp ${lop} tại TP. Trà Vinh`,
            `Lớp ${lop}`,
            200000 + (i * 20000),
            'TP. Trà Vinh',
            `Cần tìm gia sư giỏi cho con lớp ${lop}. Học 2 buổi/tuần, mỗi buổi 1.5 giờ.`,
            '2 buổi/tuần'
          ]
        );
      }
      console.log(`✅ Đã tạo thêm ${needPosts} bài đăng`);
    } else {
      console.log('✅ Đã có đủ bài đăng');
    }
    
    // 4. Kiểm tra và đảm bảo tất cả gia sư có môn học
    console.log('📚 Đang kiểm tra môn học của gia sư...');
    const [tutorsWithoutSubjects] = await connection.query(`
      SELECT hsg.id, nd.ho_ten
      FROM ho_so_gia_su hsg
      JOIN nguoi_dung nd ON hsg.nguoi_dung_id = nd.id
      WHERE hsg.id NOT IN (SELECT DISTINCT gia_su_id FROM gia_su_mon_hoc)
    `);
    
    if (tutorsWithoutSubjects.length > 0) {
      const [subjects] = await connection.query('SELECT id FROM mon_hoc');
      
      for (const tutor of tutorsWithoutSubjects) {
        // Mỗi gia sư chọn 2-3 môn ngẫu nhiên
        const numSubjects = 2 + Math.floor(Math.random() * 2);
        const selectedSubjects = subjects
          .sort(() => Math.random() - 0.5)
          .slice(0, numSubjects);
        
        for (const subject of selectedSubjects) {
          await connection.query(
            `INSERT IGNORE INTO gia_su_mon_hoc (id, gia_su_id, mon_hoc_id) 
             VALUES (UUID(), ?, ?)`,
            [tutor.id, subject.id]
          );
        }
        console.log(`✅ Đã thêm môn học cho ${tutor.ho_ten}`);
      }
    } else {
      console.log('✅ Tất cả gia sư đã có môn học');
    }
    
    connection.release();
    
    // 5. Chạy lại check system
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║           📊 KIỂM TRA LẠI SAU KHI SETUP               ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');
    
    const conn2 = await pool.getConnection();
    
    const [finalCheck] = await conn2.query(`
      SELECT 
        (SELECT COUNT(*) FROM nguoi_dung) as total_users,
        (SELECT COUNT(*) FROM ho_so_gia_su) as total_tutors,
        (SELECT COUNT(*) FROM bai_dang) as total_posts,
        (SELECT COUNT(*) FROM don_ung_tuyen) as total_applications,
        (SELECT COUNT(*) FROM danh_gia) as total_reviews,
        (SELECT COUNT(*) FROM mon_hoc) as total_subjects
    `);
    
    const result = finalCheck[0];
    console.log('✅ Tổng người dùng      :', result.total_users);
    console.log('✅ Tổng gia sư          :', result.total_tutors);
    console.log('✅ Tổng bài đăng        :', result.total_posts);
    console.log('✅ Tổng đơn ứng tuyển   :', result.total_applications);
    console.log('✅ Tổng đánh giá        :', result.total_reviews);
    console.log('✅ Tổng môn học         :', result.total_subjects);
    
    conn2.release();
    
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║          ✅ HỆ THỐNG SẴN SÀNG HOẠT ĐỘNG!              ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
    console.log('\n📋 Tài khoản test:');
    console.log('   👨‍💼 Admin  : admin@tutorlink.vn / giasu123');
    console.log('   🎓 Gia sư : 1101210001@st.tvu.edu.vn / giasu123');
    console.log('   👪 Phụ huynh: Tạo mới tại /register\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

autoSetupComplete();
