"use client";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Layout from "@/components/template/Layout";
import Loader from "@/components/ui/Loader";
import BreadcrumbBtn from "@/components/template/BreadcrumbBtn";


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
    const [employeeName, setEmployeeName] = useState("");

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

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setGroupId(searchParams.get("gid"));
        setGroupTitle(searchParams.get("gtitle"));
        setEmployeeName(searchParams.get("ename"));
    }, []);

    return(
        <Layout breadcrumb={breadcrumb}>
            <div className="w-full overflow-x-auto px-3">
                <div className="min-w-full">
                    <TableHeader />
                    {attendanceData.map((data, index) => (
                        <AttendanceRow key={index} data={data} />
                    ))}
                </div>
            </div>
        </Layout>
    )
}

// Individual row component that can be used with map
const AttendanceRow = ({ data }) => {
    return (
      <div className="flex flex-col justify-center md:flex-row border-b border-r border-l last:rounded-b-xl bg-white">
        <div className="p-3 my-auto text-center md:w-[14.28%] font-medium">
          <div>{data.day}</div>
          <div className="text-sm text-gray-500">{data.date}</div>
        </div>
        <div className="p-3 my-auto text-center md:w-[14.28%]">{data.attendanceTime}</div>
        <div className="p-3 my-auto text-center md:w-[14.28%]">{data.departureTime}</div>
        <div className="p-3 my-auto text-center md:w-[14.28%]">{data.totalTime}</div>
        <div className="p-3 my-auto text-center md:w-[14.28%]">
          <span className="px-3 py-1 rounded-full bg-green-100">{data.increaseAmount}</span>
        </div>
        <div className="p-3 my-auto text-center md:w-[14.28%]">
          <span className="px-3 py-1 rounded-full bg-red-100">{data.decreaseAmount}</span>
        </div>
        <div className="p-3 my-auto text-center md:w-[14.28%]">
            {data.notes != "" ? data.notes : "......."}
        </div>
      </div>
    )
}

// Table header component
const TableHeader = () => {
    return (
      <div className="flex flex-col md:flex-row bg-gray-200 border-b font-bold rounded-t-xl">
        <div className="p-3 text-center md:w-[14.28%]">اليوم</div>
        <div className="p-3 text-center md:w-[14.28%]">وقت الحضور</div>
        <div className="p-3 text-center md:w-[14.28%]">وقت الانصراف</div>
        <div className="p-3 text-center md:w-[14.28%]">الوقت الكلي</div>
        <div className="p-3 text-center md:w-[14.28%]">مقدار الزيادة</div>
        <div className="p-3 text-center md:w-[14.28%]">مقدار النقصة</div>
        <div className="p-3 text-center md:w-[14.28%]">الملاحظات</div>
      </div>
    )
}