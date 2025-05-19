"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import createEmployee from "@/utils/grouppage/createEmployee";
import selectImage from "@/utils/grouppage/selectImage";
import saveImage from "@/utils/grouppage/saveImage";
import handleNumInput from "@/utils/handleNumInput";

export default function CreateEmployeeBtn({getEmployees, groupId}){
    const [isOpen, setIsOpen] = useState(false);

    // states for values
    const [name, setName] = useState("");
    const [annualLeaveDays, setAnnualLeaveDays] = useState("");
    const [order, setOrder] = useState("");
    const [image, setImage] = useState("");

    // image preview and save states
    const [previewImage, setPreviewImage] = useState("");
    const [imagePath, setImagePath] = useState("");

    const submitFunc = async () => {
        if(name != "" && annualLeaveDays != "" && order != ""){
            setIsOpen(false);

            // call saveImage function only if the user selected an image
            if(image != "") await saveImage(imagePath);
            
            await createEmployee(name, image, annualLeaveDays, order, groupId)
            await getEmployees();

            setName("");
            setAnnualLeaveDays("");
            setOrder("");
            setImage("");
            setPreviewImage("");
            setImagePath("");
        } else {
            alert("يجب ملئ جميع الحقول.");
        }
    }

    function emptyPreviewImage(){
        setPreviewImage("");
    }

    return(
    <>
        <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center mr-3 mt-7 gap-x-2 w-fit bg-accent1 text-white font-bold px-3 py-1 rounded-full transition-all hover:text-accent1 hover:bg-white border border-accent1" 
        >   
            إضافة موظف +
        </button>
        <Modal 
            title="إضافة موظف"
            sumbitLabel="إضافة"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            submitFunc={submitFunc}
            close={emptyPreviewImage}
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
                        onChange={e => setName(e.target.value)}
                        required=""
                        name="name"
                        data-autofocus
                    />
                    <div className="flex items-center justify-center gap-x-8">
                        <div>
                            <p className="text-sm pb-1 pr-1">عدد الإجازات للموظف:</p>
                            <input
                                className="px-4 py-2 bg-comp rounded-xl" 
                                type="number" 
                                placeholder="الإجازات" 
                                onKeyDown={e => handleNumInput(e, setAnnualLeaveDays)}
                                onChange={e => setAnnualLeaveDays(e.target.value)}
                                required=""
                                name="annual_leave_days"
                            />
                        </div>
                        <div>
                            <p className="text-sm pb-1 pr-1">تسلسل الموظف:</p>
                            <input
                                className="px-4 py-2 bg-comp rounded-xl" 
                                type="number" 
                                placeholder="التسلسل" 
                                onKeyDown={e => handleNumInput(e, setOrder)}
                                onChange={e => setOrder(e.target.value)}
                                required=""
                                name="order"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-start pt-5 gap-x-5 items-center">
                    <button 
                        type="button"
                        className="w-fit bg-accent1 text-white font-bold px-3 py-1 rounded-full cursor-pointer transition-all hover:text-accent1 hover:bg-white border border-accent1"
                        onClick={() => selectImage(setPreviewImage, setImagePath, setImage)}
                    >
                        إضافة صورة
                        
                    </button>
                    <div className="size-16 overflow-hidden rounded-full">
                        <img 
                            src={previewImage || "/imgs/default.png"}
                            alt="لا تتوفر صورة"
                            className="w-full h-full"
                        />
                    </div>
                </div>
                
                <button type="submit" hidden />
            </form>
        </Modal>
    </>
    );
}