import React, { useState } from "react";
import "./Nav.css";

interface NavProps {
    onCategoryChange: (category: string) => void;
    categories: { name: string; category: string; icon: string }[];
    isPrimary: boolean;
}

const Nav: React.FC<NavProps> = ({ onCategoryChange, categories, isPrimary }) => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0].category);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        onCategoryChange(category);
    };

    return (
        <nav className={`resources-nav ${isPrimary ? "primary" : "secondary"}`}>
            <ul className="resources-filter">
                {categories.map((item) => (
                    <li key={item.category}>
                        <button
                            className={`resource-btn ${selectedCategory === item.category ? "selected" : ""}`}
                            onClick={() => handleCategoryClick(item.category)}
                        >
                            <img
                                src={`/logos/${item.icon}`}
                                alt={item.name}
                                className="resource-icon"
                            />
                            <span className="resource-btn-name">{item.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
