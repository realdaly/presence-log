"use client";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Layout from "@/components/template/Layout";
import Loader from "@/components/ui/Loader";
import BreadcrumbBtn from "@/components/template/BreadcrumbBtn";
import readSingleGroup from "@/utils/homepage/readSingleGroup";
import readYears from "@/utils/profilepage/readYears";
import readMonths from "@/utils/profilepage/readMonths";
import readSingleYear from "@/utils/profilepage/readSingleYear";
import readSingleMonth from "@/utils/profilepage/readSingleMonth";
import readDays from "@/utils/profilepage/readDays";
import calcTotalMoreLess from "@/utils/profilepage/calcTotalMoreLess";
import calcRemainingLeaveDays from "@/utils/profilepage/calcRemainingLeaveDays";
import CreateYearBtn from "@/components/profilepage/CreateYearBtn";
import CreateMonthBtn from "@/components/profilepage/CreateMonthBtn";
import CreateDayBtn from "@/components/profilepage/CreateDayBtn";
import DaysTable from "@/components/profilepage/DaysTable";
import MiniTable from "@/components/profilepage/MiniTable";

export default function profile(){
    const [groupId, setGroupId] = useState("");
    const [groupTitle, setGroupTitle] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [employeeName, setEmployeeName] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [totalMoreLess, setTotalMoreLess] = useState({});
    const [remainingLeaveDays, setRemainingLeaveDays] = useState("");
    const [groupInfo, setGroupInfo] = useState({});
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

    const getTotalMoreLess = async () => {
      const calculatedMoreLess = await calcTotalMoreLess(employeeId);
      setTotalMoreLess(calculatedMoreLess);
    }

    const getRemainingLeaveDays = async () => {
      const calculatedRemainingDays = await calcRemainingLeaveDays(employeeId);
      setRemainingLeaveDays(calculatedRemainingDays);
    }

    const getGroupInfo = async () => {
      const fetchedGroupInfo = await readSingleGroup(groupId);      
      setGroupInfo(fetchedGroupInfo);
    }

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

    const updateCurrentDateInfo = async () => {
      const fetchedMonth = await readSingleMonth(currentMonth.id);   
      const fetchedYear = await readSingleYear(currentYear.id);   
      setCurrentMonth(fetchedMonth);
      setCurrentYear(fetchedYear);
    };

    const getDays = async () => {
      const fetchedDays = await readDays(employeeId, currentMonth.id, currentYear.id);      
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
        getGroupInfo();
        getYears();
        getTotalMoreLess();
        getRemainingLeaveDays();
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
          <div className="w-full overflow-x-auto">
            <h1 className="text-xl font-bold py-3 pr-3">
              {employeeName}
            </h1>
            <div className="pb-3 flex flex-wrap items-center gap-2 pr-3">
              <CreateYearBtn 
                employeeId={employeeId}
                years={yearsData}
                getYears={getYears}
                currentYear={currentYear}
                setCurrentYear={setCurrentYear}
              />
              <CreateMonthBtn 
                employeeId={employeeId}
                year={currentYear}
                months={monthsData}
                getMonths={getMonths}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
              />
              <CreateDayBtn 
                employeeId={employeeId}
                year={currentYear}
                month={currentMonth}
                getDays={getDays}
                groupInfo={groupInfo}
                getRemainingLeaveDays={getRemainingLeaveDays}
              />
            </div>
            <DaysTable 
              daysData={daysData}
              monthsData={monthsData}
              yearsData={yearsData}
              currentMonth={currentMonth}
              currentYear={currentYear}
              groupInfo={groupInfo}
              getDays={getDays}
              updateCurrentDateInfo={updateCurrentDateInfo}
              getTotalMoreLess={getTotalMoreLess}
              getRemainingLeaveDays={getRemainingLeaveDays}
            />
            {(currentMonth) && 
            <div className="flex flex-wrap gap-4 pt-4 px-3">
              <MiniTable 
                label={`المجموع الشهري - ${currentMonth?.title}`}
                moreHours={currentMonth?.more_hours}
                moreMins={currentMonth?.more_minutes}
                lessHours={currentMonth?.less_hours}
                lessMins={currentMonth?.less_minutes}
              />
              <MiniTable 
                label={`المجموع السنوي - ${currentYear?.title}`}
                moreHours={currentYear?.more_hours}
                moreMins={currentYear?.more_minutes}
                lessHours={currentYear?.less_hours}
                lessMins={currentYear?.less_minutes}
              />
              <MiniTable 
                label={`المجموع التراكمي للسنوات`}
                moreHours={totalMoreLess.more.hours}
                moreMins={totalMoreLess.more.minutes}
                lessHours={totalMoreLess.less.hours}
                lessMins={totalMoreLess.less.minutes}
              />
              <div>
                <div className="p-3 text-center bg-gray-200 border-b border-l-2 rounded-t-xl font-bold">
                  متبقي الإجازات للموظف
                </div>
                <div className="border-b border-r border-l rounded-b-xl bg-white p-3 font-bold text-xl text-center">
                  {remainingLeaveDays}
                </div>
              </div>
            </div>}
          </div>
        }
      </Layout>
    )
}