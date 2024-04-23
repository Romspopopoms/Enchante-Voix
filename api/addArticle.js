import { Pool } from 'pg';

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

    let { title, description, imageUrl, videoUrl, link } = req.body;
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }

    // Convert YouTube URL to embed URL
    videoUrl = convertToEmbedURL(videoUrl);

    try {
        const query = 'INSERT INTO articles (title, description, imageUrl, videoUrl, link) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const params = [title, description, imageUrl, videoUrl, link];
        const { rows } = await pool.query(query, params);
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

function convertToEmbedURL(url) {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}
