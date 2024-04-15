import React from'react';
import LogoVox from "../assets/Logo Vox unity V1 1.png"
const Footer = () => {
    return (
    <div className='bg-[#EFE386] h-auto flex justify-between'>
        <div className='w-auto flex justify-center items-center mx-12 xl:mx-4 gap-2'>
            <h2 className='font-baloo text-[#A47A32]'>Developed by</h2>
            <img src={LogoVox} alt="" className='h-auto w-auto' />
            </div>
            <div className='w-auto flex justify-center items-center mx-4 gap-2'>
            <h2 className='font-baloo text-md text-[#A47A32]'> 
            © Copyright2024<br></br> EnChante’Voix. Tous droits réservés.</h2> 
        </div>
    </div>
    )
}

export default Footer