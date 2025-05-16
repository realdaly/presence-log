export default function MiniTable({
    label, 
    moreHours, 
    moreMins, 
    lessHours, 
    lessMins
}){
    return(
        <div className="w-fit">
            {/* table header */}
            <div className="p-3 text-center bg-gray-200 border-b border-l-2 rounded-t-xl font-bold">
                {label}
            </div>
            {/* table body */}
            <div className="border-b border-r border-l bg-white p-3">
                <div className="flex items-center gap-x-3">
                    <span className="font-semibold">
                        الزيادة بالوقت:
                    </span>
                    <span className="px-3 rounded-full bg-green-100 flex">
                        <p className="font-bold w-7 text-center">{moreHours}</p>
                        ساعة و
                        <p className="font-bold w-7 text-center">{moreMins}</p>
                        دقيقة
                    </span>
                </div>
            </div>
            <div className="border-b border-r border-l rounded-b-xl bg-white p-3">
                <div className="flex items-center gap-x-3">
                    <span className="font-semibold">
                        النقيصة بالوقت:
                    </span>
                    <span className="px-3 rounded-full bg-red-100 flex">
                        <p className="font-bold w-7 text-center">{lessHours}</p>
                        ساعة و
                        <p className="font-bold w-7 text-center">{lessMins}</p>
                        دقيقة
                    </span>
                </div>
            </div>
        </div>
    );
}