export const Skeleton =()=>{
    return <div>

<div role="status" className=" animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
    <div>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <div className="">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            </div>
            
            <div className="flex justify-center flex-col font-extralight text-sm pl-2">  <div className="h-2 bg-gray-200 rounded-full  max-w-[480px] mb-2.5"></div></div>
            <div className="flex justify-center flex-col pl-2 ">  <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div></div>
            <div className="flex justify-center flex-col pl-2 font-thin text-slate-500 text-sm">
            <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
            </div>
        </div>
        <div className="text-xl font-semibold pt-2">
        <div className="h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5"></div>
        </div>
        <div className="text-md font-thin">
        <div className="h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5"></div>
        </div>
        <div className=" text-slate-500 text-sm font-thin pt-4">
        <div className="h-2 bg-gray-200 rounded-full  max-w-[440px] mb-2.5"></div>
        </div>
        <div>

        </div>
    </div>
    </div>
    
        
       
       
        
       
        
    
    <span className="sr-only">Loading...</span>
</div>


    </div>
}