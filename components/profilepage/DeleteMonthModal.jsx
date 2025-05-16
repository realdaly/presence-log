import Modal from "@/components/ui/Modal";
import deleteMonth from "@/utils/profilepage/deleteMonth";

export default function DeleteMonthModal({
    currentMonth, 
    yearId, 
    getMonths, 
    getYears, 
    setRightClickMenu, 
    isOpen, 
    setIsOpen, 
    updateCurrentDateInfo, 
    getTotalMoreLess, 
    getRemainingLeaveDays, 
    getEmployeeStatistics
}){
    const submitFunc = async () => {
        setIsOpen(false);
        await deleteMonth(currentMonth?.id, yearId);
        await getMonths();
        await getYears();
        await updateCurrentDateInfo();
        await getTotalMoreLess();
        await getRemainingLeaveDays();
        await getEmployeeStatistics();
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