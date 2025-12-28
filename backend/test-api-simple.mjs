const API_URL = 'http://localhost:5000/api';

console.log('🔐 Testing Login API directly...\n');

async function test() {
    try {
        // Test 1: Health check
        console.log('1️⃣ Testing health endpoint...');
        const health = await fetch(`${API_URL}/health`);
        const healthData = await health.json();
        console.log('✅ Health:', healthData.message);
        console.log('');

        // Test 2: Login Admin
        console.log('2️⃣ Testing Admin login...');
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@tutorlink.vn',
                mat_khau: 'admin123'
            })
        });

        const loginData = await loginResponse.json();
        
        if (loginData.success) {
            console.log('✅ Login SUCCESS');
            console.log('   User:', loginData.data.user.ho_ten);
            console.log('   Role:', loginData.data.user.vai_tro);
            console.log('   Token:', loginData.data.token.substring(0, 30) + '...');
            console.log('');

            // Test 3: Verify token
            console.log('3️⃣ Testing /auth/me with token...');
            const meResponse = await fetch(`${API_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${loginData.data.token}`
                }
            });

            const meData = await meResponse.json();
            if (meData.success) {
                console.log('✅ Token valid! User:', meData.data.ho_ten);
            } else {
                console.log('❌ Token invalid:', meData.message);
            }
        } else {
            console.log('❌ Login FAILED:', loginData.message);
        }

        console.log('');
        console.log('✅ All tests completed!');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

test();
