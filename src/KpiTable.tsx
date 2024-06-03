import React from "react";

interface KpiTableProps {
    data: {
        Category: string;
        KPI: string;
        Traduction: string;
        Definition: string;
        Formula: string;
        Example: string;
        Excel: string;
        Remark: string;
    }[];
}

const KpiTable: React.FC<KpiTableProps> = ({ data }) => {
    console.log("KpiTable data:", data); // Debugging log

    return (
        <table className="kpi-table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>KPI</th>
                    <th>Traduction</th>
                    <th>Definition</th>
                    <th>Formula</th>
                    <th>Example</th>
                    <th>Excel</th>
                    <th>Remark</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.Category}</td>
                        <td>{item.KPI}</td>
                        <td>{item.Traduction}</td>
                        <td>{item.Definition}</td>
                        <td>{item.Formula}</td>
                        <td>{item.Example}</td>
                        <td>{item.Excel}</td>
                        <td>{item.Remark}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


export default KpiTable;
