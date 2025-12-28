import pool from './config/database.js';

const checkAllTables = async () => {
  try {
    const connection = await pool.getConnection();
    
    console.log('📋 Cấu trúc bảng nguoi_dung:');
    const [cols1] = await connection.query('DESCRIBE nguoi_dung');
    cols1.forEach(col => console.log(`  ${col.Field} - ${col.Type}`));
    
    console.log('\n📋 Cấu trúc bảng ho_so_sinh_vien:');
    const [cols2] = await connection.query('DESCRIBE ho_so_sinh_vien');
    cols2.forEach(col => console.log(`  ${col.Field} - ${col.Type}`));
    
    console.log('\n📋 Cấu trúc bảng ho_so_gia_su:');
    const [cols3] = await connection.query('DESCRIBE ho_so_gia_su');
    cols3.forEach(col => console.log(`  ${col.Field} - ${col.Type}`));
    
    console.log('\n📋 Cấu trúc bảng gia_su_mon_hoc:');
    const [cols4] = await connection.query('DESCRIBE gia_su_mon_hoc');
    cols4.forEach(col => console.log(`  ${col.Field} - ${col.Type}`));
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
};

checkAllTables();
