export default function Statistics({remainingLeaveDays}){
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
                    <div className="p-3 flex items-center justify-between">
                        <span className="pl-2">
                            الإجازات المتبقية:
                        </span>
                        <span className="font-bold">
                            {remainingLeaveDays}
                        </span>
                    </div>
                </div>
                {/* lwop days */}
                <div className="border-b">
                    <div className="p-3 flex items-center justify-between">
                        <span className="pl-2">
                            الإجازات بدون راتب:
                        </span>
                        <span className="font-bold">
                            {remainingLeaveDays}
                        </span>
                    </div>
                </div>
                {/* absence days */}
                <div className="border-b">
                    <div className="p-3 flex items-center justify-between">
                        <span className="pl-2">
                            أيام الغيابات:
                        </span>
                        <span className="font-bold">
                            {remainingLeaveDays}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}