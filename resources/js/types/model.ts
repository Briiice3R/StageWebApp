export interface Company{
    siren: string;
    nom_complet: string;
    nom_raison_sociale: string;
    siege: {
        commune: string;
    };
}
export interface Student{
    student_id: string;
    first_name: string;
    last_name: string;
}

export interface Internship{
    company_siren: string;
    start_date: Date;
    end_date: Date;
    is_remote: boolean;
    internship_subject: string;
    student_task: string;
    comment:string;
    student_id: string;
    teacher_id: string;
    supervisor_id: string;
}

export interface Teacher{
    first_name: string;
    last_name: string;
    email: string;

}
