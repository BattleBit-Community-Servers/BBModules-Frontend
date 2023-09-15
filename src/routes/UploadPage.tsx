import { useState, useEffect } from "react";
import { apiUrl } from "../../api/modules";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null as string | null);

    // Function to handle file selection
    const handleFileSelect = (event: any) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.name.endsWith(".cs")) {
            setFile(selectedFile);
        } else {
            setError("Please select a valid .cs file.");
        }
    };

    // Function to handle file drop
    const handleFileDrop = (event: any) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && droppedFile.name.endsWith(".cs")) {
            setFile(droppedFile);
        } else {
            setError("Please drop a valid .cs file.");
        }
    };

    // Function to handle file upload to API
    const uploadFile = async () => {
        if (file) {
            setUploading(true);
            setError(null);
            setResult(null);

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await fetch(`${apiUrl}/Upload`, {
                    method: "POST",
                    body: formData,
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setResult(data);
                } else {
                    setError("Upload failed. Please try again.");
                }
            } catch (err) {
                setError(
                    "An error occurred while uploading. Please try again later."
                );
            } finally {
                setUploading(false);
            }
        } else {
            setError("Please select a valid .cs file.");
        }
    };

    useEffect(() => {
        if (file) {
            uploadFile();
        }
    }, [file]);

    return (
        <div>
            <h1>Upload a new module</h1>
            {result ? (
                <p style={{ color: "green" }}>{result}</p>
            ) : (
                <>
                    <input
                        type="file"
                        accept=".cs"
                        onChange={handleFileSelect}
                        onDrop={handleFileDrop}
                        style={{ display: "none" }}
                    />
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleFileDrop}
                        style={{
                            border: "2px dashed #ccc",
                            padding: "20px",
                            textAlign: "center",
                        }}
                    >
                        {uploading ? (
                            <div>
                                Uploading and verifying...
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            <>
                                {error ? (
                                    <p style={{ color: "red" }}>{error}</p>
                                ) : null}
                                <p>
                                    Drag and drop a .cs file here, or click to
                                    select one.
                                </p>
                                <button
                                    onClick={() =>
                                        document
                                            .querySelector('input[type="file"]')
                                            ?.click()
                                    }
                                >
                                    Select a .cs file
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
