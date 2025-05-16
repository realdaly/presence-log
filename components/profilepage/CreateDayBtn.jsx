"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import createDay from "@/utils/profilepage/createDay";
import handleNumInput from "@/utils/handleNumInput";

export default function CreateDayBtn({
    employeeId, 
    year, 
    month, 
    groupInfo, 
    getDays, 
    updateCurrentDateInfo, 
    getTotalMoreLess, 
    getRemainingLeaveDays, 
    getEmployeeStatistics
}){

    let [isOpen, setIsOpen] = useState(false);
    let [selectedStatus, setSelectedStatus] = useState(null);

    // states for values
    let [title, setTitle] = useState("");
    let [timeOffValue, setTimeOffValue] = useState(0);
    let [isLwopValue, setIsLwopValue] = useState(0);
    let [isAbsentValue, setIsAbsentValue] = useState(0);
    let [attendHour, setAttendHour] = useState("");
    let [attendMin, setAttendMin] = useState("");
    let [leaveHour, setLeaveHour] = useState("");
    let [leaveMin, setLeaveMin] = useState("");
    let [exitHour, setExitHour] = useState("");
    let [exitMin, setExitMin] = useState("");
    let [enterHour, setEnterHour] = useState("");
    let [enterMin, setEnterMin] = useState("");
    let [dateMonth, setDateMonth] = useState("");
    let [dateDay, setDateDay] = useState("");
    let [note, setNote] = useState("");

    const submitFunc = async () => {
        if(title){
            setIsOpen(false);
            await createDay(
                title, 
                timeOffValue, 
                isLwopValue, 
                isAbsentValue, 
                attendHour, 
                attendMin, 
                leaveHour, 
                leaveMin, 
                exitHour, 
                exitMin, 
                enterHour, 
                enterMin, 
                dateDay, 
                dateMonth, 
                note, 
                groupInfo.required_hours, 
                groupInfo.required_minutes, 
                employeeId, 
                month?.id, 
                year?.id
            );
            await getDays();
            await updateCurrentDateInfo();
            await getTotalMoreLess();
            await getRemainingLeaveDays();
            await getEmployeeStatistics();
            setTitle("");
            setTimeOffValue(0);
            setIsLwopValue(0);
            setIsAbsentValue(0);
            setSelectedStatus(null);
            setAttendHour("");
            setAttendMin("");
            setLeaveHour("");
            setLeaveMin("");
            setExitHour("");
            setExitMin("");
            setEnterHour("");
            setEnterMin("");
            setDateMonth("");
            setDateDay("");
            setNote("");
        } else {
            alert("يجب ملئ جميع الحقول.");
        }
    }

    
    useEffect(() => {
        setTimeOffValue(selectedStatus === "time_off" ? 1 : 0);
        setIsLwopValue(selectedStatus === "is_lwop" ? 1 : 0);
        setIsAbsentValue(selectedStatus === "is_absent" ? 1 : 0);
    }, [selectedStatus]);

    return(
    <>
        <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center gap-x-2 w-fit select-none bg-accent1 text-white font-bold px-3 py-1 rounded-full transition-all hover:text-accent1 hover:bg-white border border-accent1 disabled:hover:bg-comp disabled:bg-comp disabled:text-black disabled:opacity-50 disabled:border-comp" 
            disabled={!month}
        >   
            إضافة يوم +
        </button>
        <Modal 
            title={`إضافة يوم إلى ${month?.title}`}
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
                    placeholder="أدخل اسم اليوم، الخميس مثلاً"
                    className="px-4 py-2 bg-comp rounded-xl w-96" 
                    type="text"
                    name="day_title"
                    onChange={e => setTitle(e.target.value)}
                    data-autofocus
                />
                <div className="flex items-center justify-between w-full pt-3 select-none">
                    <div className="flex items-center justify-start">
                        <input 
                            id="time_off" 
                            type="radio" 
                            name="day_status" 
                            checked={selectedStatus === "time_off"}
                            onClick={() => setSelectedStatus(prev => prev === "time_off" ? null : "time_off")}
                            readOnly
                            className="cursor-pointer size-7"
                        />
                        <label htmlFor="time_off" className="cursor-pointer mr-2">
                            إجازة براتب
                        </label>
                    </div>

                    <div className="flex items-center justify-start">
                        <input 
                            id="is_lwop" 
                            type="radio" 
                            name="day_status" 
                            checked={selectedStatus === "is_lwop"}
                            onClick={() => setSelectedStatus(prev => prev === "is_lwop" ? null : "is_lwop")}
                            readOnly
                            className="cursor-pointer size-7"
                        />
                        <label htmlFor="is_lwop" className="cursor-pointer mr-2">
                            إجازة بدون راتب
                        </label>
                    </div>

                    <div className="flex items-center justify-start">
                        <input 
                            id="is_absent" 
                            type="radio" 
                            name="day_status" 
                            checked={selectedStatus === "is_absent"}
                            onClick={() => setSelectedStatus(prev => prev === "is_absent" ? null : "is_absent")}
                            readOnly
                            className="cursor-pointer size-7"
                        />
                        <label htmlFor="is_absent" className="cursor-pointer mr-2">
                            غياب
                        </label>
                    </div>
                </div>
                <div className="pt-5">
                    <p className="text-center pb-1 font-bold">وقت الحضور:</p>
                    <div className="w-full flex items-center gap-x-10">
                        <div>
                            <p className="text-center pb-2">الحضور:</p>
                            <div className="flex items-center gap-x-3">
                                <input
                                    placeholder="الساعة"
                                    className="px-4 py-2 bg-comp rounded-xl w-20 disabled:bg-black/50" 
                                    type="text"
                                    name="attend_hour"
                                    onKeyDown={e => handleNumInput(e, setAttendHour)}
                                    onChange={e => setAttendHour(e.target.value)}
                                    disabled={selectedStatus}
                                    maxLength={2}
                                    />
                                <input
                                    placeholder="الدقيقة"
                                    className="px-4 py-2 bg-comp rounded-xl w-20 disabled:bg-black/50" 
                                    type="text"
                                    name="attend_minute"
                                    onKeyDown={e => handleNumInput(e, setAttendMin)}
                                    onChange={e => setAttendMin(e.target.value)}
                                    maxLength={2}
                                    disabled={selectedStatus}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-center pb-2">الانصراف:</p>
                            <div className="flex items-center gap-x-3">
                                <input
                                    placeholder="الساعة"
                                    className="px-4 py-2 bg-comp rounded-xl w-20 disabled:bg-black/50" 
                                    type="text"
                                    name="leave_hour"
                                    onKeyDown={e => handleNumInput(e, setLeaveHour)}
                                    onChange={e => setLeaveHour(e.target.value)}
                                    maxLength={2}
                                    disabled={selectedStatus}
                                    />
                                <input
                                    placeholder="الدقيقة"
                                    className="px-4 py-2 bg-comp rounded-xl w-20 disabled:bg-black/50" 
                                    type="text"
                                    name="leave_minute"
                                    onKeyDown={e => handleNumInput(e, setLeaveMin)}
                                    onChange={e => setLeaveMin(e.target.value)}
                                    maxLength={2}
                                    disabled={selectedStatus}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-7">
                    <p className="text-center pb-1 font-bold">وقت الخروج الضمني:</p>
                    <div className="w-full flex items-center gap-x-10">
                        <div>
                            <p className="text-center pb-2">الخروج:</p>
                            <div className="flex items-center gap-x-3">
                                <input
                                    placeholder="الساعة"
                                    className="px-4 py-2 bg-comp rounded-xl w-20 disabled:bg-black/50" 
                                    type="text"
                                    name="exit_hour"
                                    onKeyDown={e => handleNumInput(e, setExitHour)}
                                    onChange={e => setExitHour(e.target.value)}
                                    maxLength={2}
                                    disabled={selectedStatus}
                                    />
                                <input
                                    placeholder="الدقيقة"
                                    className="px-4 py-2 bg-comp rounded-xl w-20 disabled:bg-black/50" 
                                    type="text"
                                    name="exit_minute"
                                    onKeyDown={e => handleNumInput(e, setExitMin)}
                                    onChange={e => setExitMin(e.target.value)}
                                    maxLength={2}
                                    disabled={selectedStatus}
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-center pb-2">العودة:</p>
                            <div className="flex items-center gap-x-3">
                                <input
                                    placeholder="الساعة"
                                    className="px-4 py-2 bg-comp rounded-xl w-20 disabled:bg-black/50" 
                                    type="text"
                                    name="enter_hour"
                                    onKeyDown={e => handleNumInput(e, setEnterHour)}
                                    onChange={e => setEnterHour(e.target.value)}
                                    maxLength={2}
                                    disabled={selectedStatus}
                                    />
                                <input
                                    placeholder="الدقيقة"
                                    className="px-4 py-2 bg-comp rounded-xl w-20 disabled:bg-black/50" 
                                    type="text"
                                    name="enter_minute"
                                    onKeyDown={e => handleNumInput(e, setEnterMin)}
                                    onChange={e => setEnterMin(e.target.value)}
                                    maxLength={2}
                                    disabled={selectedStatus}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-7">
                    <p className="text-center pb-2 font-bold">تاريخ اليوم:</p>
                    <div className="flex items-center gap-x-8">
                        <input
                            placeholder="اليوم"
                            className="px-4 py-2 bg-comp rounded-xl w-44" 
                            type="text"
                            name="date_day"
                            onKeyDown={e => handleNumInput(e, setDateDay)}
                            onChange={e => setDateDay(e.target.value)}
                            maxLength={2}
                            />
                        <input
                            placeholder="الشهر"
                            className="px-4 py-2 bg-comp rounded-xl w-44" 
                            type="text"
                            name="date_month"
                            onKeyDown={e => handleNumInput(e, setDateMonth)}
                            onChange={e => setDateMonth(e.target.value)}
                            maxLength={2}
                        />
                    </div>
                    <textarea
                        className="px-4 py-2 bg-comp rounded-xl resize-none w-full mt-5 h-20"
                        placeholder="الملاحظات" 
                        onChange={e => setNote(e.target.value)}
                        name="note" 
                    ></textarea>
                </div>
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}