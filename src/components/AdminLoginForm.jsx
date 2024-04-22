import React, { useState } from 'react';

const AdminLoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event, login) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.success) {
                console.log('Connexion réussie');
                window.location.href = '/';
                login();  // Met à jour l'état global de connexion

            } else {
                console.error('Échec de la connexion', data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nom d'utilisateur:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
                Mot de passe:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit">Connexion</button>
        </form>
    );
};

export default AdminLoginForm;
