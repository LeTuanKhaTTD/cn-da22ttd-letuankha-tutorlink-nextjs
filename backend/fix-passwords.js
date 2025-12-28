import pool from './config/database.js';
import bcrypt from 'bcryptjs';

async function fixPasswords() {
    console.log('🔧 Fixing passwords...\n');

    try {
        // Hash for "admin123"
        const adminHash = await bcrypt.hash('admin123', 10);
        console.log('Generated hash for admin123:', adminHash.substring(0, 30) + '...');

        // Update admin password
        await pool.query(
            'UPDATE nguoi_dung SET mat_khau = ? WHERE email = ?',
            [adminHash, 'admin@tutorlink.vn']
        );
        console.log('✅ Updated admin password');

        // Hash for "123456" (tutor password)
        const tutorHash = await bcrypt.hash('123456', 10);
        console.log('Generated hash for 123456:', tutorHash.substring(0, 30) + '...');

        // Update all tutor passwords
        const [result] = await pool.query(
            'UPDATE nguoi_dung SET mat_khau = ? WHERE email LIKE ?',
            [tutorHash, '%@st.tvu.edu.vn']
        );
        console.log(`✅ Updated ${result.affectedRows} tutor passwords`);

        console.log('\n✅ All passwords fixed!');
        console.log('\nTest with:');
        console.log('  Admin: admin@tutorlink.vn / admin123');
        console.log('  Tutor: 1101210001@st.tvu.edu.vn / 123456');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await pool.end();
    }
}

fixPasswords();
