import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { TiDelete } from "react-icons/ti";
import deleteDay from "@/utils/profilepage/deleteDay";

export default function DeleteDayBtn({
    year, 
    month, 
    currentDay, 
    getDays, 
    updateCurrentDateInfo, 
    getTotalMoreLess, 
    getRemainingLeaveDays, 
    getEmployeeStatistics
}){
    let [isOpen, setIsOpen] = useState(false);

    const submitFunc = async () => {
        setIsOpen(false);
        await deleteDay(currentDay.id, month.id, year.id);
        await getDays();
        await updateCurrentDateInfo();
        await getTotalMoreLess();
        await getRemainingLeaveDays();
        await getEmployeeStatistics();
    }

    return(
    <>
        <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-between w-full gap-x-3 p-1 pr-2 text-danger transition-all hover:bg-comp"
        >
            <p>حذف</p>
            <TiDelete className="size-6" />
        </button>
        <Modal 
            title={`هل أنت متأكد من حذف "${currentDay.title}"؟`}
            desc="لا يمكن التراجع عن هذه الخطوة!"
            sumbitLabel="حذف"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            submitFunc={submitFunc}
            isDanger={true}
        />
    </>
    );
}