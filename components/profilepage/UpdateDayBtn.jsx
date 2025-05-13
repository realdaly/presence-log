"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import updateDay from "@/utils/profilepage/updateDay";
import handleNumInput from "@/utils/handleNumInput";
import { TbEditCircle } from "react-icons/tb";

export default function UpdateDayBtn({
    year, 
    month, 
    groupInfo, 
    getDays, 
    currentDay, 
    updateCurrentDateInfo, 
    getTotalMoreLess, 
    getRemainingLeaveDays
}){
    let [isOpen, setIsOpen] = useState(false);

    // states for values
    let [title, setTitle] = useState(currentDay?.title);
    let [timeOff, setTimeOff] = useState(currentDay?.time_off == 0 ? false : true);
    let [timeOffValue, setTimeOffValue] = useState(currentDay?.time_off);
    let [attendHour, setAttendHour] = useState(currentDay?.time_off == 0 ? currentDay?.attend_hour : "");
    let [attendMin, setAttendMin] = useState(currentDay?.time_off == 0 ? currentDay?.attend_minute : "");
    let [leaveHour, setLeaveHour] = useState(currentDay?.time_off == 0 ? currentDay?.leave_hour : "");
    let [leaveMin, setLeaveMin] = useState(currentDay?.time_off == 0 ? currentDay?.leave_minute : "");
    let [exitHour, setExitHour] = useState(currentDay?.time_off == 0 ? currentDay?.exit_hour : "");
    let [exitMin, setExitMin] = useState(currentDay?.time_off == 0 ? currentDay?.exit_minute : "");
    let [enterHour, setEnterHour] = useState(currentDay?.time_off == 0 ? currentDay?.enter_hour : "");
    let [enterMin, setEnterMin] = useState(currentDay?.time_off == 0 ? currentDay?.enter_minute : "");
    let [dateMonth, setDateMonth] = useState(currentDay?.date_month);
    let [dateDay, setDateDay] = useState(currentDay?.date_day);
    let [note, setNote] = useState(currentDay?.note ?? "");

    const submitFunc = async () => {
        if(title){
            setIsOpen(false);
            await updateDay(
                currentDay.id,
                title, 
                timeOffValue, 
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
                month.id, 
                year.id
            );
            await getDays();
            await updateCurrentDateInfo();
            await getTotalMoreLess();
            await getRemainingLeaveDays();
            setTitle(prev => prev);
            setTimeOff(prev => prev);
            setTimeOffValue(prev => prev);
            setAttendHour(prev => prev);
            setAttendMin(prev => prev);
            setLeaveHour(prev => prev);
            setLeaveMin(prev => prev);
            setExitHour(prev => prev);
            setExitMin(prev => prev);
            setEnterHour(prev => prev);
            setEnterMin(prev => prev);
            setDateMonth(prev => prev);
            setDateDay(prev => prev);
            setNote(prev => prev);
        } else {
            alert("يجب ملئ جميع الحقول.");
        }
    }

    useEffect(() => {
        if(timeOff == true){
            setTimeOffValue(1);
        } else{
            setTimeOffValue(0);
        }
    }, [timeOff]);

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
            title={`تعديل اليوم ${currentDay.title}`}
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
                    placeholder="أدخل اسم اليوم، الخميس مثلاً"
                    className="px-4 py-2 bg-comp rounded-xl w-96" 
                    type="text"
                    name="day_title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    data-autofocus
                />
                <div className="flex items-center justify-start w-full pt-3 mr-5 select-none">
                    <input 
                        id="default-checkbox" 
                        type="checkbox" 
                        name="time_off" 
                        checked={timeOff}
                        onChange={e => setTimeOff(e.target.checked)}
                        className="cursor-pointer size-7"
                    />
                    <label 
                        htmlFor="default-checkbox" 
                        className="cursor-pointer mr-2"
                    >
                            يوم إجازة
                    </label>
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
                                    value={attendHour}
                                    onKeyDown={e => handleNumInput(e, setAttendHour)}
                                    onChange={e => setAttendHour(e.target.value)}
                                    disabled={timeOff}
                                    maxLength={2}
                                    />
                                <input
                                    placeholder="الدقيقة"
                                    className="px-4 py-2 bg-comp rounded-xl w-20 disabled:bg-black/50" 
                                    type="text"
                                    name="attend_minute"
                                    value={attendMin}
                                    onKeyDown={e => handleNumInput(e, setAttendMin)}
                                    onChange={e => setAttendMin(e.target.value)}
                                    maxLength={2}
                                    disabled={timeOff}
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
                                    value={leaveHour}
                                    onKeyDown={e => handleNumInput(e, setLeaveHour)}
                                    onChange={e => setLeaveHour(e.target.value)}
                                    maxLength={2}
                                    disabled={timeOff}
                                    />
                                <input
                                    placeholder="الدقيقة"
                                    className="px-4 py-2 bg-comp rounded-xl w-20 disabled:bg-black/50" 
                                    type="text"
                                    name="leave_minute"
                                    value={leaveMin}
                                    onKeyDown={e => handleNumInput(e, setLeaveMin)}
                                    onChange={e => setLeaveMin(e.target.value)}
                                    maxLength={2}
                                    disabled={timeOff}
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
                                    value={exitHour ?? ""}
                                    onKeyDown={e => handleNumInput(e, setExitHour)}
                                    onChange={e => setExitHour(e.target.value)}
                                    maxLength={2}
                                    disabled={timeOff}
                                    />
                                <input
                                    placeholder="الدقيقة"
                                    className="px-4 py-2 bg-comp rounded-xl w-20 disabled:bg-black/50" 
                                    type="text"
                                    name="exit_minute"
                                    value={exitMin ?? ""}
                                    onKeyDown={e => handleNumInput(e, setExitMin)}
                                    onChange={e => setExitMin(e.target.value)}
                                    maxLength={2}
                                    disabled={timeOff}
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
                                    value={enterHour ?? ""}
                                    onKeyDown={e => handleNumInput(e, setEnterHour)}
                                    onChange={e => setEnterHour(e.target.value)}
                                    maxLength={2}
                                    disabled={timeOff}
                                    />
                                <input
                                    placeholder="الدقيقة"
                                    className="px-4 py-2 bg-comp rounded-xl w-20 disabled:bg-black/50" 
                                    type="text"
                                    name="enter_minute"
                                    value={enterMin ?? ""}
                                    onKeyDown={e => handleNumInput(e, setEnterMin)}
                                    onChange={e => setEnterMin(e.target.value)}
                                    maxLength={2}
                                    disabled={timeOff}
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
                            value={dateDay}
                            onKeyDown={e => handleNumInput(e, setDateDay)}
                            onChange={e => setDateDay(e.target.value)}
                            maxLength={2}
                            />
                        <input
                            placeholder="الشهر"
                            className="px-4 py-2 bg-comp rounded-xl w-44" 
                            type="text"
                            name="date_month"
                            value={dateMonth}
                            onKeyDown={e => handleNumInput(e, setDateMonth)}
                            onChange={e => setDateMonth(e.target.value)}
                            maxLength={2}
                        />
                    </div>
                    <textarea
                        className="px-4 py-2 bg-comp rounded-xl resize-none w-full mt-5 h-20"
                        placeholder="الملاحظات" 
                        name="note" 
                        value={note}
                        onChange={e => setNote(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}