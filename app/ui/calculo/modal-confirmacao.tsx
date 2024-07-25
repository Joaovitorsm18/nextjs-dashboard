import React from 'react';
import Modal from './modal-erro'; // Substitua pelo caminho correto para o componente Modal

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-medium mb-4">Substituir Histórico?</h2>
                <p>Já existe um histórico para o mês selecionado. Deseja substituir?</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 text-white rounded-md p-2 mr-2 hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white rounded-md p-2 hover:bg-red-400"
                    >
                        Substituir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;