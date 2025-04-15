"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import createMonth from "@/utils/profilepage/createMonth";

export default function CreateMonthBtn({employeeId, year, getMonths}){
    let [isOpen, setIsOpen] = useState(false);

    // states for values
    let [title, setTitle] = useState("");

    const submitFunc = async () => {
        if(title){
            setIsOpen(false);
            await createMonth(title, employeeId, year.id);
            await getMonths();
            setTitle("");
        } else {
            alert("يجب ملئ جميع الحقول.");
        }
    }

    return(
    <>
        <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center mt-7 gap-x-2 w-fit select-none bg-accent1 text-white font-bold px-3 py-1 rounded-full transition-all hover:text-accent1 hover:bg-white border border-accent1 disabled:hover:bg-comp disabled:bg-comp disabled:text-black disabled:opacity-50 disabled:border-comp" 
            disabled={!year}
        >   
            إضافة شهر +
        </button>
        <Modal 
            title="إضافة شهر"
            sumbitLabel="إضافة"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            submitFunc={submitFunc}
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
                    onChange={e => setTitle(e.target.value)}
                    data-autofocus
                />
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}