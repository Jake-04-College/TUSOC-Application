export const runtime = "nodejs";

import { uploadImageController } from "../../../controller/cloudinaryController";

export async function POST(req) {
    return uploadImageController(req, { Folder: "soc-app/posts" });
}
