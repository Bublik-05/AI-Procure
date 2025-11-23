import { useState } from "react";
import { parseTender, extractTender } from "../services/api";

export default function TenderInfo({ tenderId, onExtracted }) {
    const [parsedText, setParsedText] = useState("");

    async function handleParse() {
        const result = await parseTender(tenderId);
        setParsedText(result.text);
    }

    async function handleExtract() {
        const result = await extractTender(tenderId);
        onExtracted(result);
    }

    return tenderId ? (
        <div>
            <h3>Parsed Text</h3>
            <button onClick={handleParse}>Parse</button>

            <textarea
                value={parsedText}
                readOnly
                rows={8}
                style={{ width: "100%" }}
            />

            <button onClick={handleExtract}>Extract with AI</button>
        </div>
    ) : null;
}
