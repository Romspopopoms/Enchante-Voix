import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    console.log('Request received:', req.method, req.url);

    if (req.method !== 'GET') {
        console.log('Method not allowed:', req.method);
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        console.log('Querying database for articles');
        const query = 'SELECT distinct section FROM articles ORDER BY section ASC';
        const { rows } = await pool.query(query);
        console.log('section retrieved:', rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}
