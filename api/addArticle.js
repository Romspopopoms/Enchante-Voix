const Busboy = require('busboy');
const { Pool } = require('pg');
const { put } = require('@vercel/blob');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

function convertToEmbedURL(url) {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method not allowed');
    }

    if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
        return res.status(400).end('Content-Type should be multipart/form-data');
    }

    const busboy = new Busboy({ headers: req.headers });
    let data = {
        title: '',
        description: '',
        videoUrl: '',
        link: '',
        imageUrl: ''
    };

    await new Promise((resolve, reject) => {
        busboy.on('file', async (fieldname, file, filename) => {
            if (fieldname === 'imageFile') {
                try {
                    const { url } = await put(`articles/${Date.now()}-${filename}`, file, { access: 'public' });
                    data.imageUrl = url;
                    resolve(); // Resolve the promise once the file is handled
                } catch (error) {
                    console.error('Failed to upload image:', error);
                    file.resume();
                    reject(error);
                }
            } else {
                file.resume();
            }
        });

        busboy.on('field', (fieldname, val) => {
            if (data.hasOwnProperty(fieldname)) {
                data[fieldname] = val;
            }
        });

        busboy.on('finish', () => {
            resolve();
        });

        req.pipe(busboy);
    });

    try {
        data.videoUrl = convertToEmbedURL(data.videoUrl);
        const query = 'INSERT INTO articles (title, description, imageUrl, videoUrl, link) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const params = [data.title, data.description, data.imageUrl, data.videoUrl, data.link];
        const { rows } = await pool.query(query, params);
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}
