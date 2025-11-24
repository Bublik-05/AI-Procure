export async function uploadTender(formData) {
    const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData
    });
    return res.json();
}
