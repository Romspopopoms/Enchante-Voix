import { put } from '@vercel/blob';
import { Pool } from 'pg';
import { parseMultipartData } from '@vercel/fetch'; // Cette fonction aide à gérer multipart/form-data

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});
export default async function handler(req, res) {
    return res.status(401).json({ success: false, message: "method not defined" });
}
/*export async function AddArticle(req, res) {
    alert('je suis dans api de addarticle');
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Parse multipart/form-data
    const { fields, files } = await parseMultipartData(req);
    if (!fields || !files) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    const { title, description, videoUrl, link } = fields;
    let imageUrl = '';

    try {
        // Handling file upload
        if (files.imageFile) {
            const file = files.imageFile[0]; // Accéder au fichier
            const { url } = await put(`articles/${Date.now()}-${file.originalFilename}`, file.data, { access: 'public' });
            imageUrl = url;
        }

        const embedUrl = convertToEmbedURL(videoUrl);
        const query = 'INSERT INTO articles (title, description, imageUrl, videoUrl, link) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const params = [title, description, imageUrl, embedUrl, link];
        const { rows } = await pool.query(query, params);
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}*/

function convertToEmbedURL(url) {
    alert('je suis dans api de addarticle : convertToEmbedURL');
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(youtube\.com\/watch\?v=|youtu.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[2]}` : url;
}
