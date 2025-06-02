const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../config/database');

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '15m',
    issuer: 'your-app-name',
    audience: 'your-app-users'
  });
};

const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString('hex');
};

const storeRefreshToken = async (userId, refreshToken) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  try {
    await db.query(
      'INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES ($1, $2, $3)',
      [refreshToken, userId, expiresAt]
    );
  } catch (error) {
    throw new Error('Failed to store refresh token');
  }
};

const verifyRefreshToken = async (refreshToken) => {
  try {
    const result = await db.query(
      `SELECT rt.*, u.id as user_id, u.email, u.first_name, u.last_name, u.is_active 
       FROM refresh_tokens rt 
       JOIN users u ON rt.user_id = u.id 
       WHERE rt.token = $1 AND rt.expires_at > NOW() AND rt.is_revoked = false`,
      [refreshToken]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const tokenData = result.rows[0];
    
    if (!tokenData.is_active) {
      await revokeRefreshToken(refreshToken);
      return null;
    }

    return tokenData;
  } catch (error) {
    throw new Error('Failed to verify refresh token');
  }
};

const revokeRefreshToken = async (refreshToken) => {
  try {
    await db.query(
      'UPDATE refresh_tokens SET is_revoked = true WHERE token = $1',
      [refreshToken]
    );
  } catch (error) {
    throw new Error('Failed to revoke refresh token');
  }
};

const revokeAllUserTokens = async (userId) => {
  try {
    await db.query(
      'UPDATE refresh_tokens SET is_revoked = true WHERE user_id = $1 AND is_revoked = false',
      [userId]
    );
  } catch (error) {
    throw new Error('Failed to revoke user tokens');
  }
};

const cleanupExpiredTokens = async () => {
  try {
    await db.query(
      'DELETE FROM refresh_tokens WHERE expires_at < NOW() OR is_revoked = true'
    );
  } catch (error) {
    console.error('Failed to cleanup expired tokens:', error);
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  storeRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
  revokeAllUserTokens,
  cleanupExpiredTokens
};