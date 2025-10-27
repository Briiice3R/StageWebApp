import {Head} from "@inertiajs/react";
import CompanySearchInput from "@/components/CompanySearchInput";
export default function Internships({internships}:any){
    return(
        <>
            <Head title="Stages">
            </Head>
            <div className="min-h-screen min-h-screen">
                <CompanySearchInput />
                {internships.map((key:any, element:any) => (
                    <li>{element.id}</li>
                ))}
            </div>
        </>
    )
}