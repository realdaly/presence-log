"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import updateYear from "@/utils/profilepage/updateYear";
import { TbEditCircle } from "react-icons/tb";

export default function UpdateYearBtn({currentYear, getYears, setRightClickMenu}){
    let [isOpen, setIsOpen] = useState(false);

    // states for values
    const [title, setTitle] = useState(currentYear?.title);

    const submitFunc = async () => {
        if(title !== ""){
            setIsOpen(false);

            await updateYear(title, currentYear?.id);
            await getYears();
            closeFunc();

            // reset states to previous values
            setTitle(prev => prev);
        } else {
            alert("يجب ملئ جميع الحقول.");
        }
    }

    const closeFunc = () => {
        setRightClickMenu(false);
    }

    return(
    <>
        <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-between w-full gap-x-3 p-1 pr-2 text-green-600 transition-all hover:bg-comp" 
        >   
            <p>تعديل</p>
            <TbEditCircle className="size-6" />
        </button>
        <Modal 
            title="تعديل السنة"
            sumbitLabel="تـــم"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            submitFunc={submitFunc}
            close={closeFunc}
        >
            <form 
                className="flex flex-col items-center"
                onSubmit={e => {
                    e.preventDefault(),
                    submitFunc()
                }}
            >
                <input
                    placeholder="أدخل رقم السنة، 2025 مثلاً"
                    className="px-4 py-2 bg-comp rounded-xl w-96" 
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    data-autofocus
                />
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}