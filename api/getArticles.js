// /api/getArticles.js
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Method not allowed" });
    }
    return res.status(403).json({ message: "Method not allowed" });

    try {
        const query = 'SELECT * FROM articles'; // Assurez-vous que votre table s'appelle 'articles'
        const { rows } = await pool.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}
