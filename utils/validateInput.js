module.exports = function validateInput(data, type = 'register') {
  const { username, email, password } = data;

  if (type === 'register') {
    if (!username || !email || !password) {
      return 'Username, email, and password are required';
    }

    // Optional: Add format or strength checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
  }

  if (type === 'login') {
    if (!username || !password) {
      return 'Username and password are required';
    }
  }

  return null;
};
