"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import updateEmployee from "@/utils/grouppage/updateEmployee";
import handleNumInput from "@/utils/handleNumInput";
import selectImage from "@/utils/grouppage/selectImage";
import saveImage from "@/utils/grouppage/saveImage";
import { TbEditCircle } from "react-icons/tb";
import { RiDeleteBack2Fill } from "react-icons/ri";

export default function UpdateEmployeeBtn({currentEmployee, imageUrl, getEmployees}){
    let [isOpen, setIsOpen] = useState(false);

    // states for values
    let [name, setName] = useState(currentEmployee?.name);
    let [annualLeaveDays, setAnnualLeaveDays] = useState(currentEmployee?.annual_leave_days);
    let [order, setOrder] = useState(currentEmployee?.order);
    let [image, setImage] = useState(currentEmployee?.image);

    // image preview and save states
    let [previewImage, setPreviewImage] = useState("");
    let [imagePath, setImagePath] = useState("");

    // new image state (only in this component)
    let [newImage, setNewImage] = useState("");

    const submitFunc = async () => {
        if(name != "" && annualLeaveDays != "" && order != ""){
            setIsOpen(false);

            // call saveImage function only if the user selected a new image
            if(newImage != "") {
                await saveImage(imagePath);
                await updateEmployee(name, newImage, annualLeaveDays, order, currentEmployee.group_id, currentEmployee.id);
            } else {
                await updateEmployee(name, image, annualLeaveDays, order, currentEmployee.group_id, currentEmployee.id);
            }

            
            await getEmployees();

            // reset states to previous values
            setName(prev => prev);
            setAnnualLeaveDays(prev => prev);
            setOrder(prev => prev);
            setImage(prev => prev);
            setPreviewImage("");
            setImagePath("");
        } else {
            alert("يجب ملئ جميع الحقول.");
        }
    }

    useEffect(() => {
        if(currentEmployee?.image){
            setPreviewImage(imageUrl);
        }
    }, []);

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
            title="تعديل معلومات الموظف"
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
                <div className="flex flex-col justify-center items-center gap-5">
                    <input
                        className="w-full px-4 py-2 bg-comp rounded-xl" 
                        type="text" 
                        placeholder="أدخل اسم الموظف" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required=""
                        name="name"
                        data-autofocus
                    />
                    <div className="flex items-center justify-center gap-x-8">
                        <input
                            className="px-4 py-2 bg-comp rounded-xl" 
                            type="number" 
                            placeholder="الإجازات" 
                            value={annualLeaveDays}
                            onKeyDown={e => handleNumInput(e, setAnnualLeaveDays)}
                            onChange={e => setAnnualLeaveDays(e.target.value)}
                            required=""
                            name="annual_leave_days"
                        />
                        <input
                            className="px-4 py-2 bg-comp rounded-xl" 
                            type="number" 
                            placeholder="التسلسل" 
                            value={order}
                            onKeyDown={e => handleNumInput(e, setOrder)}
                            onChange={e => setOrder(e.target.value)}
                            required=""
                            name="order"
                        />
                    </div>
                </div>
                <div className="flex justify-start pt-5 gap-x-5 items-center">
                    <button 
                        type="button"
                        className="w-fit bg-accent1 text-white font-bold px-3 py-1 rounded-full cursor-pointer transition-all hover:text-accent1 hover:bg-white border border-accent1"
                        onClick={() => selectImage(setPreviewImage, setImagePath, setNewImage)}
                    >
                        إضافة صورة
                        
                    </button>
                    <div className="size-16 overflow-hidden rounded-full">
                        <img 
                            src={previewImage ? previewImage : "/imgs/default.png"}
                            alt="الصورة الافتراضية"
                            className="w-full h-full"
                        />
                    </div>
                    <div
                        onClick={
                            () => {
                                setImage("");
                                setPreviewImage("");
                            }
                    } 
                        className="transition-all hover:opacity-75 cursor-pointer"
                    >
                        <RiDeleteBack2Fill className="size-7 text-danger" />
                    </div>
                </div>
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}