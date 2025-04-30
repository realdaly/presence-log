import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { TiDelete } from "react-icons/ti";
import deleteYear from "@/utils/profilepage/deleteYear";

export default function DeleteYearBtn({currentYear, getYears, setRightClickMenu}){
    let [isOpen, setIsOpen] = useState(false);

    const submitFunc = async () => {
        setIsOpen(false);
        await deleteYear(currentYear.id);
        await getYears();
        closeFunc();
    }

    const closeFunc = () => {
        setRightClickMenu(false);
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
            title={`هل أنت متأكد من حذف "${currentYear.title}"؟`}
            desc="لا يمكن التراجع عن هذه الخطوة!"
            sumbitLabel="حذف"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            submitFunc={submitFunc}
            isDanger={true}
            close={closeFunc}
        />
    </>
    );
}