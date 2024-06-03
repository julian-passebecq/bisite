import React, { useState, useEffect } from "react";
import "./App.css";
import Nav from "./Nav";
import SubNav from "./SubNav";
import KpiTable from "./KpiTable";
import ErdView from "./ErdView";

export default function App() {
    const [activePrimaryCategory, setActivePrimaryCategory] = useState("accounting");
    const [activeSecondaryCategory, setActiveSecondaryCategory] = useState("kpi");
    const [activeSubCategory, setActiveSubCategory] = useState("General Ledger");
    const [kpiData, setKpiData] = useState<any[]>([]);
    const [erdData, setErdData] = useState<any>({});
    const [activeErd, setActiveErd] = useState<any>({});

    const subCategories = {
        accounting: ["General Ledger", "Accounts Payable", "Accounts Receivable", "Fixed Assets", "Financial Reporting and Analysis"],
        sales: ["Sales Order Management", "Customer Relationship Management (CRM)", "Sales Performance Analytics", "Lead Management", "Quotation and Pricing"],
        finance: ["Budget Management", "Cash Flow Management", "Investment Analysis"],  // Corrected subcategories for Finance
        logistics: ["Inventory Management", "Supply Chain Efficiency", "Transportation Management"],
        marketing: ["Campaign Performance", "Customer Acquisition Cost", "Brand Awareness"],
        project: ["Project Completion", "Resource Utilization", "Project Budget"],
        hr: ["Recruitment", "Employee Satisfaction", "Training and Development"],
        erd: {
            accounting: ["Accounts Receivable", "Accounts Payable", "Compliance and Internal Controls"],
            sales: ["Retail", "Sales and Marketing"],
            hr: ["Travel and Expense", "Human Resources"],
            logistics: ["Production Control", "Procurement and Sourcing", "Inventory and Warehouse Management"],
            finance: ["General Ledger", "Fixed Assets", "Cash and Bank Management", "Budgeting"],
            project: ["Project Management and Accounting", "Service Management", "Compliance and Internal Controls"]
        }
    };

    useEffect(() => {
        const fetchErdData = async () => {
            const erdMap = {
                accounting: {
                    "Accounts Payable": [
                        { name: "ERD: Centered on table 'VendTrans'", url: "/erd/vendtrans.png" }
                    ],
                    "Accounts Receivable": [
                        { name: "ERD: Centered on table 'CustTable'", url: "/erd/custtable.png" },
                        { name: "ERD: Centered on table 'CustTrans'", url: "/erd/custtrans.png" }
                    ],
                    "Compliance and Internal Controls": [
                        { name: "ERD: Centered on table 'EMSSubstance'", url: "/erd/emsub.png" }
                    ]
                },
                finance: {
                    "Budget Management": [
                        { name: "ERD: Centered on table 'BudgetTransactionLine'", url: "/erd/budgettransactionline.png" }
                    ],
                    "Cash Flow Management": [
                        { name: "ERD: Centered on table 'BankAccountTable'", url: "/erd/bankaccounttable.png" },
                        { name: "ERD: Centered on table 'BankAccountTable' with tables from other application modules", url: "/erd/bankaccounttable.png" }
                    ],
                    "Investment Analysis": [
                        { name: "ERD: Centered on table 'AssetDepBook'", url: "/erd/assetdeptbook.png" },
                        { name: "ERD: Centered on table 'AssetBookTable'", url: "/erd/assetbooktable.png" }
                    ],
                    "General Ledger": [
                        { name: "ERD: Centered on table 'GeneralJournalAccountEntry'", url: "/erd/generaljournalaccountentry.png" }
                    ]
                },
                project: {
                    "Compliance and Internal Controls": [
                        { name: "ERD: Centered on table 'EMSSubstance'", url: "/erd/emsub.png" }
                    ],
                    "Project Management and Accounting": [
                        { name: "ERD: Centered on table 'ProjEmplTrans'", url: "/erd/projempltrans.png" },
                        { name: "ERD: Centered on table 'ProjProposalJour'", url: "/erd/projproposaljour.png" },
                        { name: "ERD: Centered on table 'PSAActivitySetup'", url: "/erd/psaactivitysetup.png" }
                    ],
                    "Service Management": [
                        { name: "ERD: Centered on table 'SMAAgreementTable'", url: "/erd/smaagreement.png" }
                    ]
                },
                sales: {
                    "Retail": [
                        { name: "ERD: Centered on table 'RetailTransactionTable'", url: "/erd/retailtranstable.png" },
                        { name: "ERD: Centered on table 'RetailStatementTable'", url: "/erd/retailstatementtable.png" }
                    ],
                    "Sales and Marketing": [
                        { name: "ERD: Centered on table 'CustTable' surrounded by tables from other application modules", url: "/erd/custtable2.png" }
                    ]
                },
                hr: {
                    "Human Resources": [
                        { name: "ERD: Centered on table 'HcmBenefit'", url: "/erd/hcmbenefit.png" }
                    ],
                    "Travel and Expense": [
                        { name: "ERD: Centered on table 'TrvExpTrans'", url: "/erd/trvexptrans.png" }
                    ]
                },
                logistics: {
                    "Inventory and Warehouse Management": [
                        { name: "ERD: Centered on table 'ShipCarrierShippingRequest'", url: "/erd/shcar.png" },
                        { name: "ERD: Centered on table 'InventDim'", url: "/erd/invdim.png" },
                        { name: "ERD: Centered on table 'InventTransOr'", url: "/erd/invtransor.png" }
                    ],
                    "Procurement and Sourcing": [
                        { name: "ERD: Centered on table 'PurchLine'", url: "/erd/purchline.png" },
                        { name: "ERD: Centered on table 'VendPackingSlipTrans'", url: "/erd/porjour.png" },
                        { name: "ERD: Centered on table 'PurchRFQTable'", url: "/erd/rfq.png" },
                        { name: "ERD: Centered on tables 'PurchReqTable' & 'PurchReqSourcingPolicyRule'", url: "/erd/req.png" },
                        { name: "ERD: Centered on tables 'SourceDocumentLine' & 'InventTransOrigin'", url: "/erd/srcdoc.png" }
                    ],
                    "Production Control": [
                        { name: "ERD: Centered on table 'COSAllocation'", url: "/erd/cosallocation.png" },
                        { name: "ERD: Centered on table 'COSLedgerTable'", url: "/erd/cosledgertable.png" }
                    ]
                }
            };

            setErdData(erdMap);
        };

        fetchErdData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let jsonFilePath;
            switch (activePrimaryCategory) {
                case "accounting":
                    jsonFilePath = "/accounting_kpis.json";
                    break;
                case "sales":
                    jsonFilePath = "/sales_kpis.json";
                    break;
                case "finance":
                    jsonFilePath = "/finance_kpis.json";
                    break;
                case "logistics":
                    jsonFilePath = "/logistics_kpis.json";
                    break;
                case "marketing":
                    jsonFilePath = "/marketing_kpis.json";
                    break;
                case "project":
                    jsonFilePath = "/project_kpis.json";
                    break;
                case "hr":
                    jsonFilePath = "/hr_kpis.json";
                    break;
                default:
                    console.error(`Unknown category: ${activePrimaryCategory}`);
                    return;
            }

            try {
                const response = await fetch(jsonFilePath);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                console.log("Fetched KPI data:", jsonData); // Debugging log
                setKpiData(jsonData[activeSubCategory] || []);
            } catch (error) {
                console.error("Error fetching KPI data:", error);
            }
        };

        if (activeSecondaryCategory === "kpi") {
            fetchData();
        }
    }, [activePrimaryCategory, activeSubCategory, activeSecondaryCategory]);

    const handlePrimaryCategoryChange = (category: string) => {
        setActivePrimaryCategory(category);
        if (activeSecondaryCategory === "kpi") {
            const firstSubCategory = subCategories[category][0];
            setActiveSubCategory(firstSubCategory);
        } else if (activeSecondaryCategory === "erd") {
            const firstSubCategory = subCategories.erd[category][0];
            setActiveSubCategory(firstSubCategory);
            setActiveErd(erdData[category]?.[firstSubCategory]?.[0] || {});
        } else {
            setActiveSubCategory("");
        }
    };

    const handleSecondaryCategoryChange = (category: string) => {
        setActiveSecondaryCategory(category);
        if (category === "kpi") {
            const firstSubCategory = subCategories[activePrimaryCategory][0];
            setActiveSubCategory(firstSubCategory);
        } else if (category === "erd") {
            const firstSubCategory = subCategories.erd[activePrimaryCategory][0];
            setActiveSubCategory(firstSubCategory);
            setActiveErd(erdData[activePrimaryCategory]?.[firstSubCategory]?.[0] || {});
        } else {
            setActiveSubCategory("");
        }
    };

    const handleSubCategoryChange = (subCategory: string) => {
        setActiveSubCategory(subCategory);
        if (activeSecondaryCategory === "erd") {
            setActiveErd(erdData[activePrimaryCategory]?.[subCategory]?.[0] || {});
        }
    };

    const handleErdChange = (erd: any) => {
        setActiveErd(erd);
    };

    return (
        <div className="App">
            <Nav onCategoryChange={handlePrimaryCategoryChange} categories={[
                { name: "Accounting", category: "accounting", icon: "accounting.png" },
                { name: "Finance", category: "finance", icon: "finance.png" },
                { name: "Logistics", category: "logistics", icon: "logistics.png" },
                { name: "Sales", category: "sales", icon: "marketing.png" },
                { name: "Project", category: "project", icon: "project.png" },
                { name: "Human Resources", category: "hr", icon: "hr.png" }
            ]} isPrimary={true} />
            <Nav onCategoryChange={handleSecondaryCategoryChange} categories={[
                { name: "KPI", category: "kpi", icon: "kpi.png" },
                { name: "ERD", category: "erd", icon: "erd.png" },
                { name: "SQL", category: "sql", icon: "sql.png" },
                { name: "Modeling", category: "modeling", icon: "modeling.png" },
                { name: "Power BI", category: "powerbi", icon: "powerbi.png" },
                { name: "Forecasting", category: "forecasting", icon: "forecasting.png" },
            ]} isPrimary={false} />
            <div className="content">
                <SubNav
                    subCategories={activeSecondaryCategory === "kpi" ? subCategories[activePrimaryCategory] : subCategories.erd[activePrimaryCategory]}
                    onSubCategoryChange={handleSubCategoryChange}
                    activeSecondaryCategory={activeSecondaryCategory}
                />
                <div className="main-content">
                    {activeSecondaryCategory === "kpi" && activeSubCategory && (
                        <KpiTable data={kpiData} />
                    )}
                    {activeSecondaryCategory === "erd" && activeSubCategory && (
                        <ErdView
                            erds={erdData[activePrimaryCategory]?.[activeSubCategory] || []}
                            activeErd={activeErd}
                            onErdChange={handleErdChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
    }
    