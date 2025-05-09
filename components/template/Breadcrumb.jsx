import { FaHouse } from "react-icons/fa6";
import BreadcrumbBtn from "@/components/template/BreadcrumbBtn";

export default function Breadcrumb({children}){
    return(
        <div className="p-3 flex flex-wrap items-center gap-2">
            <BreadcrumbBtn 
                path="/"
                label="الرئيسية"
            >
                <FaHouse className="pb-0.5" />
            </BreadcrumbBtn>
            {children}
        </div>
    )
}