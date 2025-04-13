import Link from "next/link";
import DropdownMenu from "@/components/ui/DropdownMenu";
import OptionsBtn from "@/components/ui/OptionsBtn";
import DeleteEmployeeBtn from "@/components/grouppage/DeleteEmployeeBtn";
import UpdateEmployeeBtn from "@/components/grouppage/UpdateEmployeeBtn";
import { convertFileSrc } from "@tauri-apps/api/core";

export default function EmployeeCard({currentEmployee, appDataPath, getEmployees, groupTitle, groupId}){
    // convert path to actual url to render images correctly
    const imageUrl = convertFileSrc(`${appDataPath}/${currentEmployee.image}`);

    return(
        <div className="flex flex-col gap-y-3 w-fit bg-white items-center justify-center p-10 px-16 relative rounded-2xl shadow-md">
            <DropdownMenu
                button={<OptionsBtn />}
                menuStyle="absolute left-2 top-2"
            >
                <div className="bg-domI border rounded-lg overflow-hidden">
                    <UpdateEmployeeBtn
                        currentEmployee={currentEmployee}
                        imageUrl={imageUrl}
                        getEmployees={getEmployees}
                    />
                    <DeleteEmployeeBtn 
                        currentEmployee={currentEmployee}
                        getEmployees={getEmployees}
                    />
                </div>
            </DropdownMenu>
            <div className="size-24 overflow-hidden rounded-full">
                <img 
                    src={currentEmployee.image ? imageUrl : `/imgs/default.png`}
                    alt="لا تتوفر صورة"
                    className="w-full h-full"
                />
            </div>
            <p className="font-bold text-lg">
                {currentEmployee.name}
            </p>
            <Link
                className="flex items-center gap-x-2 w-fit bg-accent1 text-white font-bold px-3 py-1 rounded-full transition-all hover:text-accent1 hover:bg-white border border-accent1" 
                href={`/profile?gid=${groupId}&gtitle=${groupTitle}&eid=${currentEmployee.id}&ename=${currentEmployee.name}`}
            >   
                عرض التفاصيل
            </Link>
        </div>
    )
}