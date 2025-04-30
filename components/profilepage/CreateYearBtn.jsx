"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import createYear from "@/utils/profilepage/createYear";
import DropdownMenu from "@/components/ui/DropdownMenu";
import { IoIosArrowDown } from "react-icons/io";
import DeleteYearBtn from "@/components/profilepage/DeleteYearBtn";
import { useEffect, useRef } from "react";

export default function CreateYearBtn({employeeId, years, getYears, currentYear, setCurrentYear}){
    let [isOpen, setIsOpen] = useState(false);

    let [rightClickMenu, setRightClickMenu] = useState(false);
    let [menuPosition, setMenuPosition] = useState();
    let [targetYear, setTargetYear] = useState({});
    const menuRef = useRef();

    const handleMenu = (e, year) => {        
        e.preventDefault();
        setRightClickMenu(true);
        setMenuPosition({x: e.pageX, y: e.pageY});
        setTargetYear(year)
    };

    // states for values
    let [title, setTitle] = useState("");

    const submitFunc = async () => {
        if(title){
            setIsOpen(false);
            await createYear(title, employeeId);
            await getYears();
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
        {years?.length == 0 && 
        <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center gap-x-2 w-fit select-none bg-accent1 text-white font-bold px-3 py-1 rounded-full transition-all hover:text-accent1 hover:bg-white border border-accent1" 
        >   
            إضافة سنة +
        </button>}
        {years?.length > 0 && 
        <DropdownMenu
            button={
                <div className="flex items-center justify-center gap-x-2 w-fit select-none bg-accent1 text-white font-bold px-3 pb-1 pt-1.5 rounded-full transition-all hover:text-accent1 hover:bg-white border border-accent1">
                    <span>
                        {currentYear.title}
                    </span>
                    <IoIosArrowDown 
                        className="transition-all group-data-[open]:rotate-180"
                    />
                </div>
            }
            panelStyle="pt-1"
        >
            {years.map(year => (
                <div 
                    onClick={() => setCurrentYear(year)}
                    onContextMenu={e => handleMenu(e, year)}
                    key={year.id}
                    className={`cursor-pointer text-center py-1 text-white font-bold bg-accent1 first:rounded-t-2xl first:pt-2 last:rounded-b-2xl transition-all hover:text-accent1 hover:bg-white border border-accent1 
                        ${currentYear.id == year.id ? "bg-white !text-accent1" : ""}
                    `}
                >
                    <p>
                        {year.title}
                    </p>
                </div>
            ))}
            <p 
                onClick={() => setIsOpen(true)}
                className="cursor-pointer px-4 py-1 text-white font-bold bg-accent1 first:rounded-t-2xl first:pt-2 last:rounded-b-2xl transition-all hover:text-accent1 hover:bg-white border border-accent1"
            >
                إضافة +
            </p>
        </DropdownMenu>}
        <Modal 
            title="إضافة سنة"
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
                    placeholder="أدخل رقم السنة، 2025 مثلاً"
                    className="px-4 py-2 bg-comp rounded-xl w-96" 
                    type="text"
                    name="title"
                    onChange={e => setTitle(e.target.value)}
                    data-autofocus
                />
                <button type="submit" hidden />
            </form>
        </Modal>
        {/* mark right click menu */}
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
                    <DeleteYearBtn 
                        currentYear={targetYear}
                        getYears={getYears}
                        setRightClickMenu={setRightClickMenu}
                    />
                </div>
            </div>
        )}
    </>
    );
}