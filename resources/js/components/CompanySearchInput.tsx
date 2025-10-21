import companyHandler from "@/utils/companyHandler";
import {Form} from "@inertiajs/react";
import { useState, useEffect } from "react";
import {Combobox, ComboboxInput, ComboboxOption} from "@headlessui/react";

type Company = {
    siren: string,
    nom_complet: string,
    nom_raison_sociale: string,
    siege:{
        adresse:string
    };
}

export default function CompanySearchInput(){
    const [companyQuery, setCompanyQuery] = useState<string>("");
    const [companyData, setCompanyData] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<Company>();

    useEffect(()=>{
        if(!companyQuery.trim() || companyQuery.trim().length <3) return;
        const interval = setTimeout(async ()=>{
            const reqApi = await companyHandler.getCompanyByText(companyQuery.trim());
            if(reqApi.data){
                setCompanyData(reqApi.data.results);
            }
        }, 800)

        return ()=>{
            clearTimeout(interval);
            setCompanyData([]);
        };
    }, [companyQuery]);
    
    return (
        <div>
            
            <div className="flex flex-col" id="companies">
                <Combobox value={selectedCompany} onChange={(c:Company)=>{
                    setSelectedCompany(c);
                    setCompanyData([]);

                }}>
                    <ComboboxInput displayValue={(c:Company | null)=>`${c?.nom_complet||""}(${c?.siren || ""})`}
                     className="border-2 border-red-600 w-xs" onChange={(e)=>setCompanyQuery(e.target.value)} />
                    <div className="bg-gray-400 inline-block w-xs">
                        {companyData.map((c:Company)=>(
                            <ComboboxOption className="border-2 border-black my-4" key={c.siren} value={c}>
                                <div className="siren_company text-xs">Siren : {c.siren}</div>
                                <div className="name_company">Nom : {c.nom_complet}</div>
                                <div className="address_company">Adresse : {c.siege.adresse}</div>
                            </ComboboxOption>
                        ))}
                    </div>
                </Combobox>
            </div>
        </div>
    )
}
