import React from "react";

interface SummaryKpiProps {
    data: {
        Category: string;
        Definition: string;
        CalculationMethod: string;
        Example: string;
    }[];
}

const SummaryKpi: React.FC<SummaryKpiProps> = ({ data }) => {
    return (
        <table className="kpi-table">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Definition</th>
                    <th>Calculation Method</th>
                    <th>Example</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.Category}</td>
                        <td>{item.Definition}</td>
                        <td>{item.CalculationMethod}</td>
                        <td>{item.Example}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SummaryKpi;