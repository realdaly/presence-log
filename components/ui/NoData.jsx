export default function NoData(){
    return(
        <div className="flex flex-col justify-center items-center">
            <p>لا توجد بيانات!</p>
            <img 
                className="w-44 opacity-50 mb-7"
                src="/imgs/empty.svg" 
                alt="لا توجد بيانات" 
            />
        </div>
    )
}