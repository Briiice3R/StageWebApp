import {Head} from "@inertiajs/react";
import CompanySearchInput from "@/components/CompanySearchInput";
export default function Internships({internships}:any){
    return(
        <>
            <Head title="Stages">
            </Head>
            <div className="bg-blue-100 min-h-screen p-4">
                <CompanySearchInput />
                {internships.map((key:any, element:any) => (
                    <li>{element.id}</li>
                ))}
            </div>
        </>
    )
}