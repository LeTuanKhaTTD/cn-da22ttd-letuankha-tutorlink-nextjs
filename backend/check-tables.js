import pool from './config/database.js';

const checkTables = async () => {
  try {
    const connection = await pool.getConnection();
    
    console.log('📋 Cấu trúc bảng don_ung_tuyen:');
    const [cols1] = await connection.query('DESCRIBE don_ung_tuyen');
    cols1.forEach(col => console.log(`  ${col.Field} - ${col.Type}`));
    
    console.log('\n📋 Cấu trúc bảng danh_gia:');
    const [cols2] = await connection.query('DESCRIBE danh_gia');
    cols2.forEach(col => console.log(`  ${col.Field} - ${col.Type}`));
    
    console.log('\n📋 Cấu trúc bảng bai_dang:');
    const [cols3] = await connection.query('DESCRIBE bai_dang');
    cols3.forEach(col => console.log(`  ${col.Field} - ${col.Type}`));
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

checkTables();
