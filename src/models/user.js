const pool = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(userData) {
        const { name, email, password, tanggal_lahir, phone } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, role, tanggal_lahir, phone) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, hashedPassword, 'user', tanggal_lahir, phone]
        );

        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT id, name, email, role, tanggal_lahir, phone, created_at, updated_at FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async updateProfile(id, userData) {
        const { name, email, tanggal_lahir, phone } = userData;

        // Build dynamic query parts and values
        const updates = [];
        const values = [];

        if (name) {
            updates.push('name = ?');
            values.push(name);
        }

        if (email) {
            updates.push('email = ?');
            values.push(email);
        }

        if (tanggal_lahir) {
            updates.push('tanggal_lahir = ?');
            values.push(tanggal_lahir);
        }

        if (phone) {
            updates.push('phone = ?');
            values.push(phone);
        }

        updates.push('updated_at = NOW()');

        // Add id as the last value
        values.push(id);

        const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;

        const [result] = await pool.query(query, values);
        return result.affectedRows > 0;
    }
}

module.exports = User;