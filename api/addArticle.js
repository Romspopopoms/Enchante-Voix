import { Pool } from 'pg';
import { put } from '@vercel/blob';  // Assurez-vous que ce module est bien importé

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    let { title, description, imageFile, videoUrl, link } = req.body;
    let imageUrl = "";  // Initialisation de imageUrl

    // Convert YouTube URL to embed URL
    videoUrl = convertToEmbedURL(videoUrl);

    // Handle image upload
    if (imageFile) {
        try {
            const { url } = await put(`articles/${Date.now()}-${imageFile.name}`, imageFile, { access: 'public' });
            imageUrl = url;
        } catch (error) {
            console.error('Failed to upload image:', error);
            return res.status(500).json({ message: "Failed to upload image" });
        }
    }

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
