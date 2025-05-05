"use client";
import { useTheme } from "@/components/template/ConfigContext";
import Breadcrumb from "@/components/template/Breadcrumb";

export default function Layout({breadcrumb, children}){
    const { isAlert, setIsAlert, loading } = useTheme();

    return(
        <div>
            <Breadcrumb>
                {breadcrumb}
            </Breadcrumb>
            {children}
        </div>
    );
}