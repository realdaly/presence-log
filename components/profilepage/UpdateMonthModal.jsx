"use client";
import Modal from "@/components/ui/Modal";
import updateMonth from "@/utils/profilepage/updateMonth";
import { useEffect, useState } from "react";

export default function UpdateMonthModal({
    currentMonth, 
    getMonths, 
    setRightClickMenu, 
    isOpen, 
    setIsOpen, 
    updateCurrentDateInfo, 
    getTotalMoreLess, 
    getRemainingLeaveDays
}){
    // states for values
    let [title, setTitle] = useState("");
    
    const submitFunc = async () => {
        if(title){
            setIsOpen(false);
            await updateMonth(title, currentMonth?.id);
            await getMonths();
            await updateCurrentDateInfo();
            await getTotalMoreLess();
            await getRemainingLeaveDays();
            setTitle("");
            closeFunc();
        } else {
            alert("يجب ملئ جميع الحقول.");
        }
    }

    const closeFunc = () => {
        setRightClickMenu(false);
    }

    useEffect(() => {
        setTitle(currentMonth?.title || "");
    }, [currentMonth]);

    return(
        <Modal 
            title="تعديل الشهر"
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
                    placeholder="أدخل اسم الشهر، يناير مثلاً"
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