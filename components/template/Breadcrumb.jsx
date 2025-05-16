import { FaHouse } from "react-icons/fa6";
import BreadcrumbBtn from "@/components/template/BreadcrumbBtn";
import ImportDatabaseBtn from "@/components/template/ImportDatabaseBtn";
import ExportDatabaseBtn from "@/components/template/ExportDatabaseBtn";

export default function Breadcrumb({children}){
    return(
        <div className="p-3 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2">
                <BreadcrumbBtn 
                    path="/"
                    label="الرئيسية"
                >
                    <FaHouse className="pb-0.5" />
                </BreadcrumbBtn>
                {children}
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <ImportDatabaseBtn />
                <ExportDatabaseBtn />
            </div>
        </div>
    )
}