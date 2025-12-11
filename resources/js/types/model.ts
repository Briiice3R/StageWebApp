import { City } from '@/types/index';

export interface Company{
    siren: string;
    nom_complet: string;
    nom_raison_sociale: string;
    siege: {
        commune: string;
        adresse: string;
        code_postal: string;
        siret: string;
        isSiege?: boolean;
        activite_principale: string;
        //Ajout qui ne provient pas de l'api
        isEtablissement?: boolean
        city?: City;
    };
    date_creation: string;
    matching_etablissements: [
        {
            code_postal: string;
            commune: string;
            adresse: string;
            region: string;
            siret: string;
            is_siege: boolean;
            activite_principale: string;
            city?: City;
            effectif_salarie?: string;
        }
    ];
    internships_count?: number;
    effectif_salarie?: string;
}
export interface Student{
    student_id: string;
    first_name: string;
    last_name: string;
}

export interface Internship{
    id?: number;
    company_siret: string;
    start_date: Date;
    end_date: Date;
    is_remote: boolean;
    internship_subject: string;
    student_task: string;
    comment:string;
    student_id: string;
    teacher_id: string;
    supervisor_id: string;
    is_paid: boolean;
}

export interface Teacher{
    teacher_id:string;
    first_name: string;
    last_name: string;
    email: string;

}
