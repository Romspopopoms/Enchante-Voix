import React from "react";
import { Link } from 'react-router-dom'; // Importez Link depuis react-router-dom
import Logo from "../assets/Frame 1.png"

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
        title: "Analyse",
        link: "/analyse"
    }
];

const Navbar = (login, logout) => {
        if (login)
            return (
                <div className="mt-12 h-16 flex flex-col items-center justify-center z-60">
            <img src={Logo} alt="logo" className="h-48 w-64 mt-32" />
            <div className="flex items-center justify-center mt-10">
                <ul className="flex flex-row">
                    {MenuAdmin.map((item) => (
                        <li key={item.title} className="mx-3">
                            <Link to={item.link} className="text-[#C08D12] font-baloo">{item.title}</Link> {/* Utilisez Link au lieu de a */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        )
        else {
            <div className="mt-12 h-16 flex flex-col items-center justify-center z-60">
            <img src={Logo} alt="logo" className="h-48 w-64 mt-32" />
            <div className="flex items-center justify-center mt-10">
                <ul className="flex flex-row">
                    {Menu.map((item) => (
                        <li key={item.title} className="mx-3">
                            <Link to={item.link} className="text-[#C08D12] font-baloo">{item.title}</Link> {/* Utilisez Link au lieu de a */}
                        </li>
                    ))}
                       <button onClick={logout}
                       className="p-4 text-white bg-[#C08D12] rounded-full font-baloo ">Se Déconnecter</button>
                </ul>
                
            </div>
        </div>
        }
}
export default Navbar;

