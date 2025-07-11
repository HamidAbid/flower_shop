import jwt from 'jsonwebtoken';

// For testing purposes
const JWT_SECRET = 'floralartistry2023secretkey';

// Test JWT generation
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

const token = generateToken('123456');
console.log('Generated token:', token);

// Test JWT verification
try {
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log('Decoded token:', decoded);
} catch (error) {
  console.error('Token verification failed:', error);
} 