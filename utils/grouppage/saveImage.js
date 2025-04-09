import { BaseDirectory, copyFile, mkdir } from "@tauri-apps/plugin-fs";

export default async function saveImage(imagePath){
    const fileName = imagePath.split("\\").pop();

    // create a dir to store images
    await mkdir("imgs", {
        baseDir: BaseDirectory.AppData,
        recursive: true
    });

    // copy img to created dir
    await copyFile(imagePath, `imgs/${fileName}`, {
        toPathBaseDir: BaseDirectory.AppData
    });
}