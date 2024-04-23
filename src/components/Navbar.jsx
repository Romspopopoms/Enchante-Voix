import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Assurez-vous que le chemin est correct
import Logo from "../assets/Frame 1.png";

const Menu = [
    { title: "Accueil", link: "/" },
    { title: "Activites", link: "/activites" },
    { title: "Tarifs", link: "/tarifs" },
    { title: "A propos", link: "/a-propos" },
    { title: "News", link: "/articles" }
];

const MenuAdmin = [
    { title: "Ajout d'articles", link: "/ajout-articles" },
    { title: "Analyse", link: "/analyse" }
];

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth()
    console.log("Navbar isLoggedIn:", isLoggedIn);

    if (isLoggedIn) {
        return (
            <div className="mt-12 h-16 flex flex-col items-center justify-center z-60">
                <img src={Logo} alt="Logo" className="h-48 w-64 mt-32" />
                <ul className="flex items-center justify-center mt-10">
                    {Menu.map((item) => (
                        <li key={item.title} className="mx-3">
                            <Link to={item.link} className="text-[#C08D12] font-baloo">{item.title}</Link>
                        </li>
                    ))}
                    {MenuAdmin.map((item) => (
                        <li key={item.title} className="mx-3">
                            <Link to={item.link} className="text-[#C08D12] font-baloo">{item.title}</Link>
                        </li>
                    ))}
                    <button 
                        onClick={logout}
                        className="p-4 text-[#C08D12] rounded-full font-baloo"
                    >
                        Se Déconnecter
                    </button>
                </ul>
            </div>
        );
    } else {
        return (
            <div className="mt-12 h-16 flex flex-col items-center justify-center z-60">
                <img src={Logo} alt="Logo" className="h-48 w-64 mt-32" />
                <ul className="flex items-center justify-center mt-10">
                    {Menu.map((item) => (
                        <li key={item.title} className="mx-3">
                            <Link to={item.link} className="text-[#C08D12] font-baloo">{item.title}</Link>
                        </li>
                    ))}
                    {MenuAdmin.map((item) => (
                        <li key={item.title} className="mx-3">
                            <Link to={item.link} className="text-[#C08D12] font-baloo">{item.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default Navbar;
