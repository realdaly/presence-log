import { FaHouse } from "react-icons/fa6";
import BreadcrumbBtn from "./BreadcrumbBtn";

export default function Breadcrumb({children}){
    return(
        <div className="p-3">
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