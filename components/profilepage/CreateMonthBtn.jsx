"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import createMonth from "@/utils/profilepage/createMonth";
import DropdownMenu from "@/components/ui/DropdownMenu";
import { IoIosArrowDown } from "react-icons/io";
import DeleteMonthBtn from "@/components/profilepage/DeleteMonthBtn";
import { useEffect, useRef } from "react";

export default function CreateMonthBtn({employeeId, year, months, getMonths, currentMonth, setCurrentMonth}){
    let [isOpen, setIsOpen] = useState(false);

    let [rightClickMenu, setRightClickMenu] = useState(false);
    let [menuPosition, setMenuPosition] = useState();
    let [targetMonth, setTargetMonth] = useState({});
    const menuRef = useRef();

    const handleMenu = (e, month) => {        
        e.preventDefault();
        setRightClickMenu(true);
        setMenuPosition({x: e.pageX, y: e.pageY});
        setTargetMonth(month)
    };

    // states for values
    let [title, setTitle] = useState("");

    const submitFunc = async () => {
        if(title){
            setIsOpen(false);
            await createMonth(title, employeeId, year.id);
            await getMonths();
            setTitle("");
        } else {
            alert("يجب ملئ جميع الحقول.");
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setRightClickMenu(false);
            }
        };
    
        if (rightClickMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [rightClickMenu]);

    return(
    <>
        {months?.length == 0 &&
        <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center gap-x-2 w-fit select-none bg-accent1 text-white font-bold px-3 py-1 rounded-full transition-all hover:text-accent1 hover:bg-white border border-accent1 disabled:hover:bg-comp disabled:bg-comp disabled:text-black disabled:opacity-50 disabled:border-comp" 
            disabled={!year}
        >   
            إضافة شهر +
        </button>}
        {months?.length > 0 && 
        <DropdownMenu
            button={
                <div className="flex items-center justify-center gap-x-2 w-fit select-none bg-accent1 text-white font-bold px-3 pb-1 pt-1.5 rounded-full transition-all hover:text-accent1 hover:bg-white border border-accent1">
                    <span>
                        {currentMonth.title}
                    </span>
                    <IoIosArrowDown 
                        className="transition-all group-data-[open]:rotate-180"
                    />
                </div>
            }
            panelStyle="pt-1"
        >
            {months.map(month => (
                <p 
                    onContextMenu={e => handleMenu(e, month)}
                    onClick={() => setCurrentMonth(month)}
                    key={month.id}
                    className={`cursor-pointer px-5 py-1 text-white font-bold bg-accent1 first:rounded-t-2xl first:pt-2 last:rounded-b-2xl transition-all hover:text-accent1 hover:bg-white border border-accent1
                        ${currentMonth.id == month.id ? "bg-white !text-accent1" : ""}    
                    `}
                >
                    {month.title}
                </p>
            ))}
            <p 
                onClick={() => setIsOpen(true)}
                className="cursor-pointer px-5 py-1 text-white font-bold bg-accent1 first:rounded-t-2xl first:pt-2 last:rounded-b-2xl transition-all hover:text-accent1 hover:bg-white border border-accent1"
            >
                إضافة +
            </p>
        </DropdownMenu>}
        <Modal 
            title="إضافة شهر"
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
                    placeholder="أدخل اسم الشهر، يناير مثلاً"
                    className="px-4 py-2 bg-comp rounded-xl w-96" 
                    type="text"
                    name="title"
                    onChange={e => setTitle(e.target.value)}
                    data-autofocus
                />
                <button type="submit" hidden />
            </form>
        </Modal>
        {/* right click menu */}
        {rightClickMenu && (
            <div
                ref={menuRef}
                className="absolute z-10 mr-8"
                style={{
                    top: `${menuPosition.y}px`,
                    left: `${menuPosition.x}px`,
                }}
            >
                <div className="absolute bg-white border border-black shadow-md rounded-md min-w-28 overflow-hidden">
                    <DeleteMonthBtn 
                        currentMonth={targetMonth}
                        getMonths={getMonths}
                        setRightClickMenu={setRightClickMenu}
                    />
                </div>
            </div>
        )}
    </>
    );
}