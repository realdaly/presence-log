import Modal from "@/components/ui/Modal";
import deleteYear from "@/utils/profilepage/deleteYear";

export default function DeleteYearModal({currentYear, getYears, setRightClickMenu, isOpen, setIsOpen}){
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
    );
}