import pool from './config/database.js';
import bcrypt from 'bcryptjs';

async function checkPasswords() {
    console.log('🔍 Checking passwords in database...\n');

    try {
        // Get admin user
        const [users] = await pool.query(
            'SELECT id, email, mat_khau, ho_ten, vai_tro FROM nguoi_dung WHERE email = ? LIMIT 1',
            ['admin@tutorlink.vn']
        );

        if (users.length === 0) {
            console.log('❌ Admin user not found!');
            return;
        }

        const user = users[0];
        console.log('👤 Found user:');
        console.log('   Email:', user.email);
        console.log('   Name:', user.ho_ten);
        console.log('   Role:', user.vai_tro);
        console.log('   Hash:', user.mat_khau.substring(0, 30) + '...');
        console.log('');

        // Test password
        const testPassword = 'admin123';
        console.log('🔐 Testing password:', testPassword);
        
        const isValid = await bcrypt.compare(testPassword, user.mat_khau);
        console.log('   Result:', isValid ? '✅ VALID' : '❌ INVALID');
        console.log('');

        // Generate new hash for comparison
        console.log('📝 Generating new hash for "admin123"...');
        const newHash = await bcrypt.hash(testPassword, 10);
        console.log('   New hash:', newHash.substring(0, 30) + '...');
        console.log('');

        // Check if we need to update
        if (!isValid) {
            console.log('⚠️  Password mismatch! Need to update...');
            console.log('');
            console.log('Run this SQL to fix:');
            console.log(`UPDATE nguoi_dung SET mat_khau = '${newHash}' WHERE email = 'admin@tutorlink.vn';`);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await pool.end();
    }
}

checkPasswords();
