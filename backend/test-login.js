/**
 * Test script để kiểm tra login API
 */

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function testLogin() {
  console.log('🔐 Testing Login API...\n');

  // Test 1: Login Admin
  try {
    console.log('1️⃣ Testing Admin Login...');
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@tutorlink.vn',
      mat_khau: 'admin123'
    });
    
    if (response.data.success) {
      console.log('✅ Admin login SUCCESS');
      console.log('   Token:', response.data.data.token.substring(0, 20) + '...');
      console.log('   User:', response.data.data.user.ho_ten);
      console.log('   Role:', response.data.data.user.vai_tro);
    }
  } catch (error) {
    console.error('❌ Admin login FAILED:', error.response?.data?.message || error.message);
  }

  console.log('\n');

  // Test 2: Login Tutor
  try {
    console.log('2️⃣ Testing Tutor Login...');
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: '1101210001@st.tvu.edu.vn',
      mat_khau: '123456'
    });
    
    if (response.data.success) {
      console.log('✅ Tutor login SUCCESS');
      console.log('   Token:', response.data.data.token.substring(0, 20) + '...');
      console.log('   User:', response.data.data.user.ho_ten);
      console.log('   Role:', response.data.data.user.vai_tro);
      console.log('   MSSV:', response.data.data.user.ma_sinh_vien);
    }
  } catch (error) {
    console.error('❌ Tutor login FAILED:', error.response?.data?.message || error.message);
  }

  console.log('\n');

  // Test 3: Wrong password
  try {
    console.log('3️⃣ Testing Wrong Password...');
    await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@tutorlink.vn',
      mat_khau: 'wrongpassword'
    });
    console.log('❌ Should have failed!');
  } catch (error) {
    console.log('✅ Correctly rejected wrong password');
    console.log('   Message:', error.response?.data?.message);
  }

  console.log('\n══════════════════════════════════════════════════');
  console.log('✅ Login API tests completed!');
}

testLogin().catch(console.error);
