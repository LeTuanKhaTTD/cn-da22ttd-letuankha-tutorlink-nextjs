import mysql from 'mysql2/promise';

// Cấu hình kết nối MySQL
const dbConfig = {
  host: 'localhost',
  user: 'tutorlink_user',
  password: 'TutorLink@2025',
  database: 'tutorlink_db',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Tạo connection pool
const pool = mysql.createPool(dbConfig);

// Kiểm tra kết nối
pool.getConnection()
  .then(connection => {
    console.log('✅ Kết nối MySQL thành công!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Lỗi kết nối MySQL:', err.message);
  });

export default pool;
