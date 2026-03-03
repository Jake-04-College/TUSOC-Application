import { NextResponse } from "next/server";
import cloudinary from "../lib/cloudinaryConnection";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const DEFAULT_FOLDER = "soc-app";

export async function uploadImageController(req, { Folder }) {
    try {
        const formData = await req.formData();
        const file = formData.get("image");
        const folder = Folder || DEFAULT_FOLDER;

        if (!(file instanceof File)) {
            return NextResponse.json({ error: "No image file provided" }, { status: 400 });
        }

        if (!file.type?.startsWith("image/")) {
            return NextResponse.json({ error: "Only image uploads are allowed" }, { status: 400 });
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "Image exceeds 10MB limit" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const uploaded = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder, resource_type: "image" },
                (error, result) => (error ? reject(error) : resolve(result))
            );
            stream.end(buffer);
        });

        return NextResponse.json(
            {
                ok: true,
                imageUrl: uploaded.secure_url,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}
