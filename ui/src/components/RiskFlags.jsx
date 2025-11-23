import { useState } from "react";
import { getRisk } from "../services/api";

export default function RiskFlags({ tenderId }) {
    const [risks, setRisks] = useState([]);

    async function handleRisk() {
        const result = await getRisk(tenderId);
        setRisks(result.risks);
    }

    return tenderId ? (
        <div>
            <h3>Risk Analysis</h3>
            <button onClick={handleRisk}>Check Risks</button>

            <ul>
                {risks.map((r, i) => (
                    <li key={i}>{r.description}</li>
                ))}
            </ul>
        </div>
    ) : null;
}
