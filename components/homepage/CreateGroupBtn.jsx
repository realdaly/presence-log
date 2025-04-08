"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import createGroup from "@/utils/homepage/createGroup";
import handleNumInput from "@/utils/handleNumInput";

export default function CreateGroupBtn({getGroups}){
    let [isOpen, setIsOpen] = useState(false);

    // states for values
    let [title, setTitle] = useState("");
    let [reqHours, setReqHours] = useState("");
    let [reqMins, setReqMins] = useState("");

    const submitFunc = async () => {
        if(title && reqHours && reqMins){
            setIsOpen(false);
            await createGroup(title, reqHours, reqMins);
            await getGroups();
            setTitle("");
            setReqHours("");
            setReqMins("");
        } else {
            alert("يجب ملئ جميع الحقول.");
        }
    }

    return(
    <>
        <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center mx-auto mt-7 gap-x-2 w-fit bg-accent1 text-white font-bold px-3 py-1 rounded-full transition-all hover:text-accent1 hover:bg-white border border-accent1" 
        >   
            إضافة نظام +
        </button>
        <Modal 
            title="إضافة نظام جديد"
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
                    placeholder="أدخل اسم النظام، نظام 4 ساعات مثلا"
                    className="px-4 py-2 bg-comp rounded-xl w-96" 
                    type="text"
                    name="title"
                    onChange={e => setTitle(e.target.value)}
                    data-autofocus
                />
                <div className="pt-5">
                    <p className="text-center pb-2">الوقت المطلوب:</p>
                    <div className="flex items-center gap-x-8">
                        <input
                            placeholder="الساعات المطلوبة"
                            className="px-4 py-2 bg-comp rounded-xl w-44" 
                            type="text"
                            name="required_hours"
                            onKeyDown={e => handleNumInput(e, setReqHours)}
                            onChange={e => setReqHours(e.target.value)}
                            maxLength={2}
                            data-autofocus
                            />
                        <input
                            placeholder="الدقائق المطلوبة"
                            className="px-4 py-2 bg-comp rounded-xl w-44" 
                            type="text"
                            name="required_minutes"
                            onKeyDown={e => handleNumInput(e, setReqMins)}
                            onChange={e => setReqMins(e.target.value)}
                            maxLength={2}
                            data-autofocus
                        />
                    </div>
                </div>
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}