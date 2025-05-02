"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import updateYear from "@/utils/profilepage/updateYear";

export default function UpdateYearModal({currentYear, getYears, setRightClickMenu, isOpen, setIsOpen}){
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

    useEffect(() => {
        setTitle(currentYear?.title || "");
    }, [currentYear]);

    return(
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
    );
}