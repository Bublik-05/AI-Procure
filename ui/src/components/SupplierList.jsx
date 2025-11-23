import { useState } from "react";
import { matchSuppliers } from "../services/api";

export default function SupplierList({ tenderId }) {
    const [suppliers, setSuppliers] = useState([]);

    async function handleMatch() {
        const result = await matchSuppliers(tenderId);
        setSuppliers(result.suppliers);
    }

    return tenderId ? (
        <div>
            <h3>Supplier Matching</h3>
            <button onClick={handleMatch}>Find Suppliers</button>

            <ul>
                {suppliers.map((s, i) => (
                    <li key={i}>{s.name} – score {s.score}</li>
                ))}
            </ul>
        </div>
    ) : null;
}
