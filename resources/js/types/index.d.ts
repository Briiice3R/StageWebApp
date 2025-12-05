export interface Auth {
    user: User;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface ValidationRules {
    condition: (value: string)=>boolean,
    errorMessage: string
}

export interface NafSection{
    id: string;
    libelle: string;
}
export interface NafActivity {
    id: string;
    label: string;
}


export interface City {
    nom: string;
    code: string;
    codeDepartement: string;
    codesPostaux: string[];
    codeRegion: string;
}

export interface Department {
    nom: string;
    code: string;
}

export interface Region {
    nom: string;
    code: string;
}

export interface GeoApiResponse<T> {
    data: T[];
}

export interface NafSection{
    id: string;
    libelle: string;
}
export interface NafActivity {
    id: string;
    label: string;
}


export interface City {
    nom: string;
    code: string;
    codeDepartement: string;
    codesPostaux: string[];
    codeRegion: string;
}

export interface Department {
    nom: string;
    code: string;
}

export interface Region {
    nom: string;
    code: string;
}

export interface GeoApiResponse<T> {
    data: T[];
}
