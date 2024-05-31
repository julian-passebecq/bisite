import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./Nav";
import SubNav from "./SubNav";
import KpiTable from "./KpiTable";

export default function App() {
    const [activePrimaryCategory, setActivePrimaryCategory] = useState("accounting");
    const [activeSecondaryCategory, setActiveSecondaryCategory] = useState("kpi");
    const [activeSubCategory, setActiveSubCategory] = useState("");
    const [kpiData, setKpiData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let jsonFilePath;
            if (activePrimaryCategory === "accounting") {
                jsonFilePath = "/accounting_kpis.json";
            } else if (activePrimaryCategory === "sales") {
                jsonFilePath = "/sales_kpis.json";
            }

            if (jsonFilePath) {
                const response = await fetch(jsonFilePath);
                const jsonData = await response.json();
                setKpiData(jsonData[activeSubCategory] || []);
            }
        };

        fetchData();
    }, [activePrimaryCategory, activeSubCategory]);

    const handlePrimaryCategoryChange = (category: string) => {
        setActivePrimaryCategory(category);
        setActiveSubCategory(""); // Reset sub-category when primary changes
    };

    const handleSecondaryCategoryChange = (category: string) => {
        setActiveSecondaryCategory(category);
        setActiveSubCategory(""); // Reset sub-category when secondary changes
    };

    const handleSubCategoryChange = (subCategory: string) => {
        setActiveSubCategory(subCategory);
    };

    const subCategories = {
        accounting: ["General Ledger", "Accounts Payable", "Accounts Receivable", "Fixed Assets", "Financial Reporting and Analysis"],
        sales: ["Sales Order Management", "Customer Relationship Management (CRM)", "Sales Performance Analytics", "Lead Management", "Quotation and Pricing"],
    };

    return (
        <div className="App">
            <Nav onCategoryChange={handlePrimaryCategoryChange} categories={[
                { name: "Accounting", category: "accounting", icon: "accounting.png" },
                { name: "Finance", category: "finance", icon: "finance.png" },
                { name: "Logistics", category: "logistics", icon: "logistics.png" },
                { name: "Sales", category: "sales", icon: "sales.png" },
                { name: "Marketing", category: "marketing", icon: "marketing.png" },
                { name: "Project", category: "project", icon: "project.png" },
            ]} isPrimary={true} />
            <Nav onCategoryChange={handleSecondaryCategoryChange} categories={[
                { name: "KPI", category: "kpi", icon: "kpi.png" },
                { name: "ERD", category: "erd", icon: "erd.png" },
                { name: "SQL", category: "sql", icon: "sql.png" },
                { name: "Modeling", category: "modeling", icon: "modeling.png" },
                { name: "Power BI", category: "powerbi", icon: "powerbi.png" },
                { name: "Statistics", category: "statistics", icon: "statistics.png" },
                { name: "Excel", category: "excel", icon: "excel.png" },
                { name: "D365", category: "d365", icon: "d365.png" },
                { name: "Forecasting", category: "forecasting", icon: "forecast.png" },
            ]} isPrimary={false} />
                <div className="content">
                <SubNav
                subCategories={subCategories[activePrimaryCategory]}
                 onSubCategoryChange={handleSubCategoryChange}
            />
            <div className="main-content">
                {activeSubCategory ? <KpiTable data={kpiData} /> : (
                    <>
                        <h1>Hello CodeSandbox</h1>
                        <h2>Start editing to see some magic happen!</h2>
                    </>
                )}
            </div>
        </div>
</div>
);
}