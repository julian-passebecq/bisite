import React from "react";
import "./SubNav.css";

interface SubNavProps {
    subCategories: string[];
    onSubCategoryChange: (subCategory: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ subCategories, onSubCategoryChange }) => {
    const handleSubCategoryClick = (subCategory: string) => {
        onSubCategoryChange(subCategory);
    };

    return (
        <nav className="sub-nav">
            <ul className="sub-nav-list">
                {subCategories.map((subItem) => (
                    <li key={subItem}>
                        <button className="sub-nav-btn" onClick={() => handleSubCategoryClick(subItem)}>
                            <span className="sub-nav-btn-name">{subItem}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SubNav;
