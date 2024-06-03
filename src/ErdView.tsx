import React from "react";
import "./ErdView.css";

interface ErdViewProps {
    erds: { name: string, url: string }[];
    activeErd: { name: string, url: string };
    onErdChange: (erd: { name: string, url: string }) => void;
}

const ErdView: React.FC<ErdViewProps> = ({ erds, activeErd, onErdChange }) => {
    console.log("ERDs:", erds); // Debugging log
    console.log("Active ERD:", activeErd); // Debugging log

    return (
        <div className="erd-view">
            <div className="erd-buttons">
                {erds.map((erd, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            console.log("Selected ERD:", erd); // Debugging log
                            onErdChange(erd);
                        }}
                        className="erd-button"
                    >
                        {erd.name}
                    </button>
                ))}
            </div>
            <div className="erd-image">
                {activeErd.url && (
                    <img src={activeErd.url} alt={activeErd.name} className="erd-img"/>
                )}
            </div>
        </div>
    );
};

export default ErdView;
