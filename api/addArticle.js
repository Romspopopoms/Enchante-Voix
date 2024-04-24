import { Pool } from 'pg';
import { put } from '@vercel/blob';
import busboy from 'busboy'; // Assurez-vous que 'busboy' est correctement importé

// Configuration de la connexion à la base de données
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false } // Adaptez cette configuration à vos besoins
});

// Définition d'une fonction pour convertir l'URL YouTube
function convertToEmbedURL(url) {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method not allowed');
    }

    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('multipart/form-data')) {
        return res.status(400).end('Content-Type should be multipart/form-data');
    }

    const data = await new Promise((resolve, reject) => {
        const result = {};
        const parser = new busboy({ headers: req.headers });

        parser.on('file', async (fieldname, file, filename, encoding, mimetype) => {
            if (fieldname === 'imageFile') {
                try {
                    const { url } = await put(`articles/${Date.now()}-${filename}`, file, { access: 'public' });
                    result.imageUrl = url;
                } catch (error) {
                    console.error('Failed to upload image:', error);
                    reject(error);
                }
            }
        });

        parser.on('field', (fieldname, val) => {
            result[fieldname] = val;
        });

        parser.on('finish', () => {
            resolve(result);
        });

        req.pipe(parser);
    });

    try {
        const { title, description, imageUrl, videoUrl, link } = data;
        const embedUrl = convertToEmbedURL(videoUrl);
        const query = 'INSERT INTO articles (title, description, imageUrl, videoUrl, link) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const params = [title, description, imageUrl, embedUrl, link];
        const { rows } = await pool.query(query, params);
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}
