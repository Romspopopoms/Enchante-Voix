import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ModalIndividuel = ({ onClose }) => {
    const modalContentRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <motion.div className="fixed inset-0 bg-opacity-30 bg-cover bg-black flex justify-center items-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div ref={modalContentRef} className="bg-[#FFFFFD] backdrop-blur-sm shadow-lg rounded-3xl xl:h-[40%] p-6 max-w-4xl w-full space-y-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
            >
                <h2 className="text-center text-3xl font-bold text-[#C6941A]">Cours de chant individuel ou collectif</h2>
                <p className="text-center text-lg text-[#D4AA40] font-bold">
                    Sur Cuges les pins, ou à votre domicile<br /> 
                    (réduction 50% crédit d'impôt) ou en ligne (équipements adaptés souhaités).<br />
                    <span className='font-thin text-sm'>limiter à 4 personnes/h)</span>
                </p>
                <div className="flex justify-center items-center">
                    <button onClick={onClose} className="py-2 px-16 bg-[#EFE386] rounded-3xl hover:bg-[#C6941A] hover:text-[#fffffd] transition-colors duration-300 xl:mt-8">
                        Fermer
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ModalIndividuel;
