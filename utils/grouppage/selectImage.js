import { convertFileSrc } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";

export default async function selectImage(setPreviewImage, setImagePath, setImage){
    // open file dialog
    const selected = await open({
        multiple: false,
        filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg", "gif"] }]
    });

    if (!selected) return;

    // convert the file path to a URL
    const fileUrl = convertFileSrc(selected);

    // set the preview image source to the file URL
    setPreviewImage(fileUrl);

    setImagePath(selected);

    // extract the file name and extension from the full path
    const fileName = selected.split("\\").pop();

    // save the full path into the image state
    setImage(`imgs/${fileName}`);
}