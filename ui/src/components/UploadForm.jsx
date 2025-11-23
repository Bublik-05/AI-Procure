import { useState } from "react";
import { uploadTender } from "../services/api";

export default function UploadForm({ onUploaded }) {
    const [file, setFile] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!file) return;
        const result = await uploadTender(file);
        onUploaded(result.tender_id);
    }

    return (
        <div>
            <h3>Upload Tender</h3>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleSubmit}>Upload</button>
        </div>
    );
}
