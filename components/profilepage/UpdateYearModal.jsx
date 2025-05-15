"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import handleNumInput from "@/utils/handleNumInput";
import handleBoundedNumInput from "@/utils/handleBoundedNumInput";
import updateYear from "@/utils/profilepage/updateYear";

export default function UpdateYearModal({
    currentYear, 
    getYears, 
    setRightClickMenu, 
    isOpen, 
    setIsOpen, 
    updateCurrentDateInfo, 
    getTotalMoreLess, 
    getRemainingLeaveDays
}){
    // states for values
    let [title, setTitle] = useState(currentYear?.title);
    let [moreHours, setMoreHours] = useState(currentYear?.more_hours);
    let [moreMins, setMoreMins] = useState(currentYear?.more_minutes);

    const submitFunc = async () => {
        if(title !== ""){
            setIsOpen(false);

            await updateYear(
                title, 
                moreHours, 
                moreMins, 
                currentYear?.id
            );
            await getYears();
            await updateCurrentDateInfo();
            await getTotalMoreLess();
            await getRemainingLeaveDays();
            
            // reset states to previous values
            setTitle(prev => prev);
            setMoreHours(prev => prev);
            setMoreMins(prev => prev);
            
            closeFunc();
        } else {
            alert("يجب ملئ جميع الحقول.");
        }
    }

    const closeFunc = () => {
        setRightClickMenu(false);
    }

    useEffect(() => {
        setTitle(currentYear?.title || "");
        setMoreHours(currentYear?.more_hours || 0);
        setMoreMins(currentYear?.more_minutes || 0);
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
                <div className="pt-7">
                    <p className="text-center pb-2 font-bold">الزيادة بالوقت:</p>
                    <div className="flex items-center gap-x-8">
                        <div>
                            <p className="text-center pb-2">الساعات:</p>
                            <input
                                placeholder="الساعات الإضافية"
                                className="px-4 py-2 bg-comp rounded-xl w-44" 
                                type="text"
                                name="more_hours"
                                value={moreHours}
                                onKeyDown={e => 
                                    handleBoundedNumInput(e, setMoreHours, parseInt(currentYear.more_hours, 10))
                                }
                                onChange={e => setMoreHours(e.target.value)}
                                maxLength={2}
                            />
                        </div>
                        <div>
                            <p className="text-center pb-2">الدقائق:</p>
                            <input
                                placeholder="الدقائق الإضافية"
                                className="px-4 py-2 bg-comp rounded-xl w-44" 
                                type="text"
                                name="more_minutes"
                                value={moreMins}
                                onKeyDown={e => handleNumInput(e, setMoreMins)}
                                onChange={e => setMoreMins(e.target.value)}
                                maxLength={2}
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" hidden />
            </form>
        </Modal>
    );
}