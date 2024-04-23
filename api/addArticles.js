import { Pool } from 'pg';

// Ensure the POSTGRES_URL environment variable is set in Vercel
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false  // Necessary if the database uses SSL
    }
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { title, description, imageUrl, link } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }

    try {
        const query = 'INSERT INTO articles (title, description, imageUrl, link) VALUES ($1, $2, $3, $4) RETURNING *';
        const params = [title, description, imageUrl, link];
        const { rows } = await pool.query(query, params);
        res.status(200).json(rows[0]); // Return the newly created article
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}
