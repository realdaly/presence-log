"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import updateGroup from "@/utils/homepage/updateGroup";
import handleNumInput from "@/utils/handleNumInput";
import { TbEditCircle } from "react-icons/tb";

export default function UpdateGroupBtn({currentGroup, getGroups}){
    const [isOpen, setIsOpen] = useState(false);

    // states for values
    const [title, setTitle] = useState(currentGroup?.title);
    const [reqHours, setReqHours] = useState(currentGroup?.required_hours);
    const [reqMins, setReqMins] = useState(currentGroup?.required_minutes);

    const submitFunc = async () => {
        if(title !== "" && reqHours !== "" && reqMins !== ""){
            setIsOpen(false);

            await updateGroup(title, reqHours, reqMins, currentGroup?.id);
            await getGroups();

            // reset states to previous values
            setTitle(prev => prev);
            setReqHours(prev => prev);
            setReqMins(prev => prev);
        } else {
            alert("يجب ملئ جميع الحقول.");
        }
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
            title="تعديل النظام"
            sumbitLabel="تـــم"
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
                    value={title}
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
                            value={reqHours}
                            onKeyDown={e => handleNumInput(e, setReqHours)}
                            onChange={(e) => setReqHours(e.target.value)}
                            maxLength={2}
                            data-autofocus
                            />
                        <input
                            placeholder="الدقائق المطلوبة"
                            className="px-4 py-2 bg-comp rounded-xl w-44" 
                            type="text"
                            name="required_minutes"
                            value={reqMins}
                            onKeyDown={e => handleNumInput(e, setReqMins)}
                            onChange={(e) => setReqMins(e.target.value)}
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