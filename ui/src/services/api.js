const BASE = "http://localhost:8000";

export async function uploadTender(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE}/upload`, {
        method: "POST",
        body: formData
    });
    return await res.json();
}

export async function parseTender(id) {
    const res = await fetch(`${BASE}/parse/${id}`);
    return await res.json();
}

export async function extractTender(id) {
    const res = await fetch(`${BASE}/extract/${id}`);
    return await res.json();
}

export async function matchSuppliers(id) {
    const res = await fetch(`${BASE}/match/${id}`);
    return await res.json();
}

export async function getRisk(id) {
    const res = await fetch(`${BASE}/risk/${id}`);
    return await res.json();
}
