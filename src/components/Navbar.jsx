import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Assurez-vous que le chemin est correct
import Logo from "../assets/Frame 1.png";

const Menu = [
    {
        title: "Accueil",
        link: "/"
    },
    {
        title: "Activites",
        link: "/activites"
    },
    {
        title: "Tarifs",
        link: "/tarifs"
    },
    {
        title: "A propos",
        link: "/a-propos"
    },
];

const MenuAdmin = [
    {
        title: "Ajout d'articles",
        link: "/ajout-articles"
    },
    {
        title: "Deconnexion",
        link: "/deconnexion"
    },
    {
        title: "Analyse",
        link: "/analyse"
    }
];

const Navbar = () => {
    const { isLoggedIn } = useAuth(); // Utilisez le hook pour accéder à l'état de connexion

    return (
        <div className="navbar">
            <img src={Logo} alt="logo" className="h-48 w-64 mt-32" />
            <ul className="flex items-center justify-center mt-10">
                {Menu.map((item) => (
                    <li key={item.title} className="mx-3">
                        <Link to={item.link} className="text-[#C08D12] font-baloo">{item.title}</Link>
                    </li>
                ))}
                {isLoggedIn && MenuAdmin.map((item) => (
                    <li key={item.title} className="mx-3">
                        <Link to={item.link} className="text-[#C08D12] font-baloo">{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navbar;
