import { useState } from "react";
import UploadForm from "./components/UploadForm";
import TenderInfo from "./components/TenderInfo";
import SupplierList from "./components/SupplierList";
import RiskFlags from "./components/RiskFlags";

export default function App() {
  const [tenderId, setTenderId] = useState(null);
  const [extracted, setExtracted] = useState(null);

  return (
    <div style={{ width: "700px", margin: "auto", padding: "20px" }}>
      <h1>AI-Procure MVP</h1>

      <UploadForm onUploaded={setTenderId} />
      <hr />

      {tenderId && (
        <>
          <TenderInfo tenderId={tenderId} onExtracted={setExtracted} />
          <SupplierList tenderId={tenderId} />
          <RiskFlags tenderId={tenderId} />
        </>
      )}
    </div>
  );
}
