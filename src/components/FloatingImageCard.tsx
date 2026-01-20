import React from 'react';

interface FloatingImageCardProps {
    imageNumber: number;
    label: string;
    style: React.CSSProperties;
    onClose: () => void;
}

export const FloatingImageCard: React.FC<FloatingImageCardProps> = ({
    imageNumber,
    label,
    style,
    onClose
}) => {
    return (
        <div
            className="fixed xp-window overflow-hidden"
            style={style}
        >
            <div className="xp-title-bar">
                <div className="text-white font-bold text-xs">Image {imageNumber}</div>
                <button
                    className="xp-close-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    ✕
                </button>
            </div>
            <div className="xp-content w-full overflow-y-auto">
                <div className="text-center">
                    <div><img
                        src={`/images/${imageNumber}.jpg`}
                        className="w-full h-auto block"
                    /></div>
                    <div className="text-xs font-mono text-gray-600">{label}</div>
                </div>
            </div>
        </div>
    );
};