/**
 * ============================================
 * CHAT CONTROLLER
 * Smart AI Chatbot với Pattern Matching
 * Không cần API key - hoạt động offline
 * ============================================
 */

/**
 * CHAT VỚI AI TRỢ LÝ
 * Smart chatbot với pattern matching cho TutorLink TVU
 */
export const chatWithAI = async (req, res) => {
  try {
    console.log('📨 Received chat request:', req.body);
    
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập tin nhắn'
      });
    }

    const userMessage = message.toLowerCase().trim();
    let aiResponse = '';

    // Pattern matching cho các câu hỏi phổ biến
    if (userMessage.includes('xin chào') || userMessage.includes('chào') || userMessage.includes('hello') || userMessage.includes('hi')) {
      aiResponse = '👋 Xin chào! Tôi là trợ lý AI của TutorLink TVU. Tôi có thể giúp bạn tìm gia sư phù hợp hoặc hướng dẫn đăng ký làm gia sư. Bạn cần hỗ trợ gì ạ?';
    }
    
    else if (userMessage.includes('tutorlink') && (userMessage.includes('là gì') || userMessage.includes('hoạt động'))) {
      aiResponse = '🎓 TutorLink TVU là nền tảng kết nối gia sư sinh viên Đại học Trà Vinh với phụ huynh. Chúng tôi giúp phụ huynh tìm gia sư uy tín và sinh viên có thêm thu nhập từ việc dạy học. Tất cả gia sư đều được xác thực MSSV!';
    }
    
    else if ((userMessage.includes('tìm') || userMessage.includes('cần')) && userMessage.includes('gia sư')) {
      aiResponse = '📚 Để tìm gia sư phù hợp, bạn có thể:\n\n1️⃣ Xem danh sách gia sư trên trang "Gia sư"\n2️⃣ Lọc theo môn học, cấp học, giá\n3️⃣ Hoặc đăng tin tìm gia sư để các bạn sinh viên ứng tuyển\n\nBạn muốn tìm gia sư dạy môn gì và lớp mấy ạ?';
    }
    
    else if ((userMessage.includes('đăng ký') || userMessage.includes('làm')) && userMessage.includes('gia sư')) {
      aiResponse = '🎯 Để đăng ký làm gia sư, bạn cần:\n\n✅ Là sinh viên TVU có MSSV\n✅ Đăng ký tài khoản và điền hồ sơ\n✅ Admin sẽ xác thực MSSV của bạn\n✅ Sau khi được duyệt, bạn có thể ứng tuyển các bài đăng!\n\nBạn đã có tài khoản chưa?';
    }
    
    else if (userMessage.includes('xác thực') || userMessage.includes('mssv')) {
      aiResponse = '✅ Có! Tất cả gia sư đều phải xác thực MSSV của sinh viên TVU. Điều này đảm bảo:\n\n🎓 Gia sư là sinh viên thật\n📚 Kiến thức được đào tạo bài bản\n🔒 An toàn cho phụ huynh và học sinh\n\nAdmin sẽ kiểm tra kỹ trước khi phê duyệt!';
    }
    
    else if (userMessage.includes('học phí') || userMessage.includes('giá') || userMessage.includes('phí') || userMessage.includes('lương')) {
      aiResponse = '💰 Học phí dao động từ 50,000đ - 200,000đ/giờ tùy theo:\n\n📚 Môn học (Toán, Lý, Hóa thường cao hơn)\n🎓 Cấp học (THPT > THCS > Tiểu học)\n🌟 Kinh nghiệm của gia sư\n📍 Hình thức (Online thường rẻ hơn Offline)\n\nBạn quan tâm môn học và cấp độ nào?';
    }
    
    else if (userMessage.includes('môn') && (userMessage.includes('gì') || userMessage.includes('nào'))) {
      aiResponse = '📖 TutorLink có gia sư dạy các môn:\n\n🔢 Toán\n⚗️ Lý, Hóa, Sinh\n📝 Văn\n🌍 Anh, Sử, Địa\n💻 Tin học, Lập trình\n\nVà nhiều môn khác! Bạn cần tìm gia sư môn gì?';
    }
    
    else if (userMessage.includes('lịch') || userMessage.includes('thời gian') || userMessage.includes('học khi nào')) {
      aiResponse = '⏰ Lịch học hoàn toàn linh động! Phụ huynh và gia sư sẽ:\n\n📅 Thỏa thuận lịch học phù hợp\n🕐 Chọn khung giờ sáng, chiều, tối\n📆 Số buổi/tuần tùy nhu cầu\n\nSau khi ứng tuyển thành công, hai bên sẽ trao đổi chi tiết!';
    }
    
    else if (userMessage.includes('online') || userMessage.includes('offline') || userMessage.includes('hình thức')) {
      aiResponse = '📍 TutorLink hỗ trợ cả 2 hình thức:\n\n💻 Online: Dạy qua Zoom/Meet, thuận tiện, tiết kiệm\n🏠 Offline: Dạy tại nhà hoặc địa điểm hẹn, tương tác trực tiếp\n\nBạn muốn học theo hình thức nào?';
    }
    
    else if (userMessage.includes('ứng tuyển') || userMessage.includes('apply')) {
      aiResponse = '📝 Để ứng tuyển:\n\n1️⃣ Xem bài đăng tìm gia sư\n2️⃣ Click "Ứng tuyển"\n3️⃣ Viết lời giới thiệu ngắn\n4️⃣ Phụ huynh sẽ xem hồ sơ và liên hệ bạn\n\nĐơn giản vậy thôi! Hãy tạo hồ sơ ấn tượng nhé!';
    }
    
    else if (userMessage.includes('đăng tin') || userMessage.includes('đăng bài')) {
      aiResponse = '📢 Để đăng tin tìm gia sư:\n\n1️⃣ Đăng nhập tài khoản Phụ huynh\n2️⃣ Click "Đăng tin tìm gia sư"\n3️⃣ Điền thông tin: môn học, lớp, lịch, học phí\n4️⃣ Đợi gia sư ứng tuyển!\n\nRất đơn giản và miễn phí!';
    }
    
    else if (userMessage.includes('liên hệ') || userMessage.includes('hỗ trợ') || userMessage.includes('help')) {
      aiResponse = '📞 Bạn cần hỗ trợ thêm? Liên hệ:\n\n📧 Email: admin@tutorlink.vn\n📱 Hotline: 0123.456.789\n🏫 Địa chỉ: Đại học Trà Vinh\n\nHoặc để lại tin nhắn, admin sẽ phản hồi sớm nhất!';
    }
    
    else if (userMessage.includes('cảm ơn') || userMessage.includes('thanks')) {
      aiResponse = '😊 Không có gì! Nếu bạn cần hỗ trợ thêm, cứ hỏi tôi bất cứ lúc nào nhé. Chúc bạn tìm được gia sư/học sinh phù hợp! 🎓';
    }
    
    else if (userMessage.includes('bye') || userMessage.includes('tạm biệt')) {
      aiResponse = '👋 Tạm biệt! Chúc bạn một ngày tốt lành. Hẹn gặp lại trên TutorLink TVU! 🌟';
    }
    
    else {
      // Default response
      aiResponse = '🤔 Tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi tôi về:\n\n🎓 Cách tìm gia sư\n📝 Đăng ký làm gia sư\n💰 Học phí và môn học\n⏰ Lịch học và hình thức\n✅ Xác thực MSSV\n\nHoặc gõ "xin chào" để bắt đầu lại!';
    }

    console.log('✅ Generated response');
    
    res.json({
      success: true,
      data: {
        message: aiResponse,
        role: 'assistant',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Lỗi chat AI:', error);
    
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xử lý chat. Vui lòng thử lại.',
      error: error.message
    });
  }
};

/**
 * LẤY GỢI Ý NHANH
 */
export const getQuickSuggestions = async (req, res) => {
  try {
    const suggestions = [
      {
        id: 1,
        icon: '👋',
        text: 'Xin chào! TutorLink hoạt động như thế nào?',
        category: 'general'
      },
      {
        id: 2,
        icon: '🎓',
        text: 'Tôi muốn tìm gia sư dạy Toán THPT',
        category: 'parent'
      },
      {
        id: 3,
        icon: '📚',
        text: 'Sinh viên đăng ký làm gia sư như thế nào?',
        category: 'tutor'
      },
      {
        id: 4,
        icon: '💰',
        text: 'Học phí gia sư dao động bao nhiêu?',
        category: 'price'
      },
      {
        id: 5,
        icon: '⏰',
        text: 'Lịch học có thể linh động không?',
        category: 'schedule'
      },
      {
        id: 6,
        icon: '✅',
        text: 'Gia sư có được xác thực MSSV không?',
        category: 'verification'
      }
    ];

    res.json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    console.error('Lỗi lấy gợi ý:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};
