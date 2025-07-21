
'use client'

import { useState, useEffect } from "react";

const LogoUpload = ({ onUpload, initialUrl }) => {
    const [logImg, setLogoImg] = useState(null);
    const [preview, setPreview] = useState(initialUrl || "");
    const [uploading, setUploading] = useState(false);

    // Update preview if initialUrl changes (e.g., after profile fetch)
    useEffect(() => {
        setPreview(initialUrl || "");
    }, [initialUrl]);

    const logImgHander = async (e) => {
        const file = e.target.files[0];
        setLogoImg(file);
        setPreview(URL.createObjectURL(file));
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
            // Optionally: folder, tags, etc.
            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.secure_url) {
                onUpload(data.secure_url);
            }
        } catch (err) {
            alert("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };
    return (
        <>
            <div className="uploading-outer">
                <div className="uploadButton">
                    <input
                        className="uploadButton-input"
                        type="file"
                        name="attachments[]"
                        accept="image/*"
                        id="upload"
                        required={false}
                        onChange={logImgHander}
                    />
                    <label
                        className="uploadButton-button ripple-effect"
                        htmlFor="upload"
                    >
                        {logImg !== null ? logImg.name : "Browse Logo"}
                    </label>
                    <span className="uploadButton-file-name"></span>
                </div>
                {preview && (
                    <div style={{ marginTop: 10 }}>
                        <img src={preview} alt="Preview" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8 }} />
                    </div>
                )}
                {uploading && <div>Uploading...</div>}
                <div className="text">
                    Max file size is 1MB, Minimum dimension: 330x300 And
                    Suitable files are .jpg & .png
                </div>
            </div>
        </>
    );
};

export default LogoUpload;
