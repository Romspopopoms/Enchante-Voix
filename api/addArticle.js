import { put } from '@vercel/blob';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    //test
    //const formdata = req.body;
    const formdata = new FormData(req.body);
    const file = formData.get('imageFile');
    const blob = await put(article.title, file, { access: 'public', token: 'vercel_blob_rw_s4TyBQ5DfffM3JDe_Z2HiBFDcrz9YY2dZlZQBhGKjdYXf9o' });
    //const retour = JSON.stringify(blob);
    //const datablob = JSON.parse(retour);
    //const obj = {title: article.title, description: article.description,imageUrl: datablob.url, videoUrl: article.videoUrl, link: article.link};
        
    return res.status(200).json({ message: 'OK avec formdata' });
    //test

    /* code OK 
    const { title, description, videoUrl, link, imageUrl } = req.body;
    try {
        //const embedUrl = convertToEmbedURL(videoUrl);
        const query = 'INSERT INTO articles (title, description, imageUrl, videoUrl, link) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const params = [title, description, imageUrl, videoUrl, link];
        const { rows } = await pool.query(query, params);
        return res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Database error:', error);
        return res.status(500).json({ message: "Internal server error" });
    } OK code */
}

function convertToEmbedURL(url) {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(youtube\.com\/watch\?v=|youtu.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[2]}` : url;
}
