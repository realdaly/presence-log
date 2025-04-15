"use client";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Layout from "@/components/template/Layout";
import Loader from "@/components/ui/Loader";
import BreadcrumbBtn from "@/components/template/BreadcrumbBtn";
import AttendanceRow from "@/components/profilepage/AttendanceRow";
import TableHeader from "@/components/profilepage/TableHeader";
import readYears from "@/utils/profilepage/readYears";
import readMonths from "@/utils/profilepage/readMonths";
import NoData from "@/components/ui/NoData";
import CreateYearBtn from "@/components/profilepage/CreateYearBtn";
import CreateMonthBtn from "@/components/profilepage/CreateMonthBtn";

export default function profile(){
    const attendanceData = [
        {
          day: "الاثنين",
          date: "08/1/2024",
          attendanceTime: "الساعة 7 و 59 دقيقة",
          departureTime: "الساعة 12 و 35 دقيقة",
          totalTime: "4 ساعة و 36 دقيقة",
          increaseAmount: "0 ساعة و 36 دقيقة",
          decreaseAmount: "0 ساعة و 0 دقيقة",
          notes: "عرض الملاحظات",
        },
        {
          day: "الاحد",
          date: "07/1/2024",
          attendanceTime: "الساعة 9 و 9 دقيقة",
          departureTime: "الساعة 14 و 10 دقيقة",
          totalTime: "5 ساعة و 1 دقيقة",
          increaseAmount: "1 ساعة و 1 دقيقة",
          decreaseAmount: "0 ساعة و 0 دقيقة",
          notes: "",
        },
        {
          day: "السبت",
          date: "06/1/2024",
          attendanceTime: "الساعة 9 و 8 دقيقة",
          departureTime: "الساعة 13 و 35 دقيقة",
          totalTime: "4 ساعة و 27 دقيقة",
          increaseAmount: "0 ساعة و 27 دقيقة",
          decreaseAmount: "0 ساعة و 0 دقيقة",
          notes: "",
        },
        {
          day: "الخميس",
          date: "04/1/2024",
          attendanceTime: "الساعة 8 و 33 دقيقة",
          departureTime: "الساعة 11 و 45 دقيقة",
          totalTime: "3 ساعة و 12 دقيقة",
          increaseAmount: "0 ساعة و 0 دقيقة",
          decreaseAmount: "0 ساعة و 48 دقيقة",
          notes: "",
        },
        {
          day: "الأربعاء",
          date: "03/1/2024",
          attendanceTime: "الساعة 9 و 0 دقيقة",
          departureTime: "الساعة 13 و 0 دقيقة",
          totalTime: "4 ساعة و 0 دقيقة",
          increaseAmount: "0 ساعة و 0 دقيقة",
          decreaseAmount: "0 ساعة و 0 دقيقة",
          notes: "",
        },
        {
          day: "الثلاثاء",
          date: "02/1/2024",
          attendanceTime: "الساعة 10 و 54 دقيقة",
          departureTime: "الساعة 14 و 46 دقيقة",
          totalTime: "3 ساعة و 52 دقيقة",
          increaseAmount: "0 ساعة و 0 دقيقة",
          decreaseAmount: "0 ساعة و 8 دقيقة",
          notes: "",
        },
        {
          day: "الاثنين",
          date: "01/1/2024",
          attendanceTime: "الساعة 9 و 33 دقيقة",
          departureTime: "الساعة 13 و 28 دقيقة",
          totalTime: "3 ساعة و 55 دقيقة",
          increaseAmount: "0 ساعة و 0 دقيقة",
          decreaseAmount: "0 ساعة و 5 دقيقة",
          notes: "",
        },
    ]

    const [groupId, setGroupId] = useState("");
    const [groupTitle, setGroupTitle] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [yearsData, setYearsData] = useState([]);
    const [monthsData, setMonthsData] = useState([]);

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
      console.log(fetchedMonths);
      
      if(fetchedMonths.length > 0){
        setCurrentMonth(fetchedMonths[0]);
      }
      setMonthsData(fetchedMonths);
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
              />
            </div>
            <div className="min-w-full">
              <TableHeader />
              {attendanceData.map((data, index) => (
                yearsData.length > 0 && monthsData.length > 0 &&
                <AttendanceRow key={index} data={data} />
              ))}
              {yearsData.length == 0 &&
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