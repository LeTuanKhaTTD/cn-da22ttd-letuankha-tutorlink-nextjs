import jwt from 'jsonwebtoken';

/**
 * Middleware xác thực JWT token
 */
export const authenticate = (req, res, next) => {
  try {
    // Lấy token từ header hoặc cookie
    let token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      token = req.cookies?.token; // Hoặc từ cookie
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Vui lòng đăng nhập để tiếp tục'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tutorlink_secret_key_2025');
    
    // Gắn thông tin user vào request
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token đã hết hạn, vui lòng đăng nhập lại'
      });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ'
    });
  }
};

/**
 * Middleware kiểm tra vai trò Admin
 */
export const isAdmin = (req, res, next) => {
  if (req.user.vai_tro !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Chỉ admin mới có quyền truy cập'
    });
  }
  next();
};

/**
 * Middleware kiểm tra vai trò Gia sư
 */
export const isTutor = (req, res, next) => {
  if (req.user.vai_tro !== 'gia_su') {
    return res.status(403).json({
      success: false,
      message: 'Chỉ gia sư mới có quyền truy cập'
    });
  }
  next();
};

/**
 * Middleware kiểm tra vai trò Phụ huynh
 */
export const isParent = (req, res, next) => {
  if (req.user.vai_tro !== 'phu_huynh') {
    return res.status(403).json({
      success: false,
      message: 'Chỉ phụ huynh mới có quyền truy cập'
    });
  }
  next();
};

/**
 * Middleware cho phép nhiều vai trò
 * @param {Array} roles - Mảng các vai trò được phép ['admin', 'gia_su', 'phu_huynh']
 */
export const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.vai_tro)) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền truy cập'
      });
    }
    next();
  };
};
