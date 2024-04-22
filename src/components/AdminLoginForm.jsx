import React, { useState } from 'react';
import { useAuth } from '../AuthContext';  // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom';

const AdminLoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();  // Utilisation de useAuth pour accéder à login
    const navigate = useNavigate();  // Hook pour la navigation

    const handleSubmit = async (event) => {
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
                login();  // Met à jour l'état global de connexion
                navigate('/');  // Redirige vers la page d'accueil
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
