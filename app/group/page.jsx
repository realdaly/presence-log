"use client";
import Layout from "@/components/template/Layout";
import { FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import Employees from "@/components/grouppage/Employees";
import Loader from "@/components/ui/Loader";
import readEmployees from "@/utils/grouppage/readEmployees";
import BreadcrumbBtn from "@/components/template/BreadcrumbBtn";
import CreateEmployeeBtn from "@/components/grouppage/CreateEmployeeBtn";

export default function group(){
    const [groupId, setGroupId] = useState("");
    const [groupTitle, setGroupTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    const [employeesData, setEmployeesData] = useState([]);
    
    const breadcrumb = (
        <BreadcrumbBtn 
            path=""
            label={groupTitle}
        >
            <FaUsers className="pb-0.5 size-5" />
        </BreadcrumbBtn>
    );
    
    
    const getEmployees = async () => {
        const fetchedEmployees = await readEmployees(groupId);
        setEmployeesData(fetchedEmployees);
    };
    
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setGroupId(searchParams.get("gid"));
        setGroupTitle(searchParams.get("gtitle"));
    }, []);
    
    useEffect(() => {
        if(groupId){
            getEmployees();
            setIsLoading(false);
        }
    }, [groupId]);

    if (!groupId) {
        return <Loader />;
    }

    return(
        <Layout breadcrumb={breadcrumb}>
            <CreateEmployeeBtn
                getEmployees={getEmployees}
                groupId={groupId}
            />
            {isLoading && <Loader />}
            {!isLoading && 
                <Employees 
                    employeesData={employeesData}
                    getEmployees={getEmployees}
                    groupTitle={groupTitle}
                    groupId={groupId}
                />
            }
        </Layout>
    );
}