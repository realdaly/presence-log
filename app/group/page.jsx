"use client";
import Layout from "@/components/template/Layout";
import { useEffect, useState } from "react";
import Employees from "@/components/grouppage/Employees";
import Loader from "@/components/ui/Loader";
import readEmployees from "@/utils/grouppage/readEmployees";

export default function Group(){
    const [groupId, setGroupId] = useState("");
    const [employeesData, setEmployeesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    
    const getEmployees = async () => {
        const fetchedEmployees = await readEmployees(groupId);
        setEmployeesData(fetchedEmployees);
    };
    
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setGroupId(searchParams.get("gid"))
        
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
        <Layout>
            {isLoading && <Loader />}
            {!isLoading && <Employees employeesData={employeesData} />}
        </Layout>
    );
}