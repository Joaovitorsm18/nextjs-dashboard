// SuccessNotification.tsx
import React, { useEffect, useState } from 'react';

interface SuccessNotificationProps {
    message: string;
    onClose: () => void;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({ message, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000); // A notificação desaparece após 3 segundos

        const fadeOutTimer = setTimeout(() => {
            onClose(); // Fecha a notificação completamente após o fade out
        }, 3300); // Espera o fade out antes de chamar onClose

        return () => {
            clearTimeout(timer);
            clearTimeout(fadeOutTimer);
        };
    }, [onClose]);

    return (
        <div
            className={`fixed bottom-4 right-4 p-4 rounded-lg text-white ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            style={{ backgroundColor: 'green' }}
        >
            {message}
        </div>
    );
};

export default SuccessNotification;
