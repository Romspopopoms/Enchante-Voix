// /api/login.js
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Both username and password are required" });
    }

    try {
        const { rows } = await sql`SELECT password FROM users WHERE username = ${username}`;
        if (rows.length > 0) {
            const matched = await bcrypt.compare(password, rows[0].password);
            if (matched) {
                return res.status(200).json({ success: true, message: "Connexion réussie" });
            } else {
                return res.status(401).json({ success: false, message: "Invalid credentials" });
            }
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error('Database or bcrypt error:', error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
