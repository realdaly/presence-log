"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import createEmployee from "@/utils/grouppage/createEmployee";
import handleNumInput from "@/utils/handleNumInput";
import { open } from "@tauri-apps/plugin-dialog";
import { BaseDirectory, copyFile, mkdir } from "@tauri-apps/plugin-fs";
import { convertFileSrc } from '@tauri-apps/api/core';

export default function CreateEmployeeBtn({getEmployees, groupId}){
    let [isOpen, setIsOpen] = useState(false);

    // states for values
    let [name, setName] = useState("");
    let [order, setOrder] = useState("9");
    let [image, setImage] = useState("");

    // image preview and save states
    let [previewImage, setPreviewImage] = useState("");
    let [imagePath, setImagePath] = useState("");

    const submitFunc = async () => {
        if(name != "" && order != "" && image != ""){
            setIsOpen(false);

            await saveImage();
            await createEmployee(name, image, order, groupId)
            await getEmployees();

            setName("");
            setOrder("");
            setImage("");
            setPreviewImage("");
            setImagePath("");
        } else {
            alert("يجب ملئ جميع الحقول.");
        }
    }

    async function selectImage(){
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

    function emptyPreviewImage(){
        setPreviewImage("");
    }

    async function saveImage(){
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

    return(
    <>
        <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center mx-auto mt-7 gap-x-2 w-fit bg-accent1 text-white font-bold px-3 py-1 rounded-full transition-all hover:text-accent1 hover:bg-white border border-accent1" 
        >   
            إضافة موظف +
        </button>
        <Modal 
            title="إضافة موظف"
            sumbitLabel="إضافة"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            submitFunc={submitFunc}
            close={emptyPreviewImage}
        >
            <form 
                className="flex flex-col items-center"
                onSubmit={e => {
                    e.preventDefault(),
                    submitFunc()
                }}
            >
                <div className="flex justify-center items-center gap-x-3">
                    <input
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring" 
                        type="text" 
                        placeholder="أدخل اسم الموظف" 
                        onChange={e => setName(e.target.value)}
                        required=""
                        name="name"
                    />
                    <input
                        className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring" 
                        type="number" 
                        placeholder="التسلسل" 
                        onKeyDown={e => handleNumInput(e, setOrder)}
                        onChange={e => setOrder(e.target.value)}
                        required=""
                        name="order"
                    />
                </div>
                <div className="flex justify-start pb-3 pt-5 gap-x-5 items-center">
                    <button 
                        type="button"
                        className="w-fit bg-accent1 text-white font-bold px-3 py-1 rounded-full cursor-pointer transition-all hover:text-accent1 hover:bg-white border border-accent1"
                        onClick={() => selectImage()}
                    >
                        إضافة صورة
                        
                    </button>
                    <div className="size-16 overflow-hidden rounded-full">
                        <img 
                            src={previewImage || "/imgs/default.png"}
                            alt="الصورة الافتراضية"
                            className="w-full h-full"
                        />
                    </div>
                </div>
                
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}