const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/LoginFunc', (req, res) => {
    const { username, password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD; // Assurez-vous que cette variable est bien définie dans votre environnement de serveur

    console.log("Admin Password from ENV:", adminPassword); // Log pour le débogage

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Tous les champs sont requis." });
    }

    if (password === adminPassword) {
        res.json({ success: true, message: "Connexion réussie." });
    } else {
        res.status(401).json({ success: false, message: "Identifiants incorrects." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
