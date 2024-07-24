import React, { useEffect, useState } from 'react';
import Modal from './modal-data'; // Substitua pelo caminho correto para o componente Modal

interface DateSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectDate: (date: string) => void;
    onSave: (date: string) => void; // Modifique a função onSave para aceitar um parâmetro de data
}

const DateSelector: React.FC<DateSelectorProps> = ({ isOpen, onClose, onSelectDate, onSave }) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    useEffect(() => {
        // Limpar a data selecionada quando o modal abrir
        if (isOpen) {
            setSelectedDate(null);
        }
    }, [isOpen]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleSave = () => {
        if (selectedDate) {
            console.log('Data selecionada no DateSelector:', selectedDate);
            onSelectDate(selectedDate);
            onSave(selectedDate); // Passe a data selecionada para a função onSave
            onClose();
        } else {
            alert('Por favor, selecione uma data.');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-medium mb-4">Selecione a Data</h2>
            <input
                type="month"
                value={selectedDate || ''}
                onChange={handleDateChange}
                className="border rounded-md p-2 mb-4 w-full"
            />
            <button
                onClick={handleSave}
                className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-400"
            >
                Salvar Data
            </button>
        </Modal>
    );
};

export default DateSelector;
