import { IoPrint } from "react-icons/io5";
import Button from "@/components/ui/Button";

export default function PrintBtn(){
    return(
        <Button
            label="طباعة"
            setFunc={() => window.print()}
        >
            <IoPrint className="size-5" />
        </Button>
    );
}