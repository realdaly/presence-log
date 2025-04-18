"use client";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Layout from "@/components/template/Layout";
import Loader from "@/components/ui/Loader";
import BreadcrumbBtn from "@/components/template/BreadcrumbBtn";
import DayRow from "@/components/profilepage/DayRow";
import TableHeader from "@/components/profilepage/TableHeader";
import readYears from "@/utils/profilepage/readYears";
import readMonths from "@/utils/profilepage/readMonths";
import readDays from "@/utils/profilepage/readDays";
import NoData from "@/components/ui/NoData";
import CreateYearBtn from "@/components/profilepage/CreateYearBtn";
import CreateMonthBtn from "@/components/profilepage/CreateMonthBtn";
import CreateDayBtn from "@/components/profilepage/CreateDayBtn";

export default function profile(){
    const [groupId, setGroupId] = useState("");
    const [groupTitle, setGroupTitle] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [yearsData, setYearsData] = useState([]);
    const [monthsData, setMonthsData] = useState([]);
    const [daysData, setDaysData] = useState([]);

    const [currentYear, setCurrentYear] = useState("");
    const [currentMonth, setCurrentMonth] = useState("");

    const breadcrumb = (
      <>
        <BreadcrumbBtn 
          path={`/group?gid=${groupId}&gtitle=${groupTitle}`}
          label={groupTitle}
        >
          <FaUsers className="pb-0.5 size-5" />
        </BreadcrumbBtn>
        <BreadcrumbBtn 
          path=""
          label={employeeName}
        >
          <FaUserCircle className="pb-0.5 size-5" />
        </BreadcrumbBtn>
      </>
    );

    const getYears = async () => {
      const fetchedYears = await readYears(employeeId);
      if(fetchedYears.length > 0){
        setCurrentYear(fetchedYears[0]);
      }
      setYearsData(fetchedYears);
    };

    const getMonths = async () => {
      const fetchedMonths = await readMonths(employeeId, currentYear.id);      
      if(fetchedMonths.length > 0){
        setCurrentMonth(fetchedMonths[0]);
      }
      setMonthsData(fetchedMonths);
    };

    const getDays = async () => {
      const fetchedDays = await readDays(employeeId, currentMonth.id, currentYear.id);
      console.log(fetchedDays[0]);
      
      setDaysData(fetchedDays);
    };

    useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      setGroupId(searchParams.get("gid"));
      setGroupTitle(searchParams.get("gtitle"));
      setEmployeeId(searchParams.get("eid"));
      setEmployeeName(searchParams.get("ename"));
    }, []);

    useEffect(() => {
      if(employeeId){
        getYears();
        setIsLoading(false);
      }
    }, [employeeId]);

    useEffect(() => {
      if(currentYear){
        getMonths();
      }
    }, [currentYear]);

    useEffect(() => {
      if(currentMonth){
        getDays();
      }
    }, [currentMonth]);

    if (!employeeId) {
      return <Loader />;
    }

    return(
      <Layout breadcrumb={breadcrumb}>
        {isLoading && <Loader />}
        {!isLoading && 
          <div className="w-full overflow-x-auto px-3">
            <div className="pb-3 flex items-center gap-2">
              <CreateYearBtn 
                employeeId={employeeId}
                getYears={getYears}
              />
              <CreateMonthBtn 
                employeeId={employeeId}
                year={currentYear}
                getMonths={getMonths}
              />
              <CreateDayBtn 
                employeeId={employeeId}
                year={currentYear}
                month={currentMonth}
                getDays={getDays}
              />
            </div>
            <div className="min-w-full">
              <TableHeader />
              {daysData.map(item => (
                yearsData.length > 0 && monthsData.length > 0 && daysData.length > 0 &&
                <DayRow 
                  key={item.id} 
                  data={item}
                  year={currentYear.title}
                />
              ))}
              {yearsData.length == 0 || monthsData.length == 0 || daysData.length == 0 &&
                <div className="pt-7">
                    <NoData />
                </div>
              }
            </div>
          </div>
        }
      </Layout>
    )
}