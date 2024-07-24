import React from 'react';

interface ModalDetalhesProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalDetalhes: React.FC<ModalDetalhesProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-7xl mx-auto p-4">
                <div className="max-h-screen overflow-y-auto">
                    {children}
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDetalhes;
