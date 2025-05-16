export default function Statistics({remainingLeaveDays, lwopDays, absentDays}){
    return(
        <div className="flex">
            <div className="flex items-center p-3 text-center bg-gray-200 border-r border-l-2 rounded-r-xl font-bold">
                <div>
                    <p>
                        إحصائيات
                    </p>
                    الموظــف
                </div>
            </div>
            <div className="border rounded-l-xl bg-white text-right">
                {/* remaining leave days */}
                <div className="border-b">
                    <div className="p-3 flex items-center justify-between gap-x-5">
                        <span>
                            الإجازات المتبقية:
                        </span>
                        <p className={`font-bold w-5 ${Number(remainingLeaveDays) == 0 ? "text-danger" : ""}`}>
                            {remainingLeaveDays}
                        </p>
                    </div>
                </div>
                {/* lwop days */}
                <div className="border-b">
                    <div className="p-3 flex items-center justify-between gap-x-5">
                        <span>
                            الإجازات بدون راتب:
                        </span>
                        <p className="font-bold w-5">
                            {lwopDays}
                        </p>
                    </div>
                </div>
                {/* absence days */}
                <div className="border-b">
                    <div className="p-3 flex items-center justify-between gap-x-5">
                        <span>
                            أيـــام الغيابـــات:
                        </span>
                        <p className="font-bold w-5">
                            {absentDays}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}