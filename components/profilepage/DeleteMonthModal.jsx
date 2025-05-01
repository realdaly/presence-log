import Modal from "@/components/ui/Modal";
import deleteMonth from "@/utils/profilepage/deleteMonth";

export default function DeleteMonthModal({currentMonth, getMonths, setRightClickMenu, isOpen, setIsOpen}){
    const submitFunc = async () => {
        setIsOpen(false);
        await deleteMonth(currentMonth?.id)
        await getMonths();
        closeFunc();
    }

    const closeFunc = () => {
        setRightClickMenu(false);
    }

    return(
        <Modal 
            title={`هل أنت متأكد من حذف "${currentMonth?.title}"؟`}
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