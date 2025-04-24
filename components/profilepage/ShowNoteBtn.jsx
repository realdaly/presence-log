"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

export default function ShowNoteBtn({note}){
    let [isOpen, setIsOpen] = useState(false);

    return(
    <>
        <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center gap-x-2 w-fit select-none bg-accent1 text-white px-2 rounded-full transition-all hover:opacity-75" 
        >   
            عرض الملاحظات
        </button>
        <Modal 
            title="الملاحظات"
            sumbitLabel="تم"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className="flex flex-col items-center max-w-screen-md min-w-72">
                <p className="p-5">{note}</p>
            </div>
        </Modal>
    </>
    );
}