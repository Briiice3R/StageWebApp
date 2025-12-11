import { Link, usePage } from '@inertiajs/react';

export default function AdminDashboardSidebar() {
    const {url} = usePage();
    const isActivePage = (path:string, isExact=false)=>{
        if(isExact) return url === path || url.substring(0, url.length-1) === path;
        return url.startsWith(path);
    }
    return (
        <aside className="w-64 bg-white shadow-lg rounded-b-lg">
            <div className="flex h-16 items-center justify-center border-b border-gray-200 bg-blue-600 rounded-t-lg">
                <h1 className="text-xl font-bold text-white">Dashboard Admin</h1>
            </div>

            <nav className="p-4">
                <ul className="space-y-2">
                    <li>
                        <Link
                            href={"/home"}
                            className={`flex items-center gap-3 rounded-lg ${isActivePage("/home") ? "bg-blue-600 text-white": ""} px-4 py-3 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Accueil
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={"/internships"}
                            className={`flex items-center gap-3 rounded-lg ${isActivePage("/internships", true) ? "bg-blue-600 text-white": ""} px-4 py-3 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                            </svg>
                            Stages
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={"/admin/students"}
                            className={`flex items-center gap-3 rounded-lg ${isActivePage("/admin/students") ? "bg-blue-600 text-white": ""} px-4 py-3 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                            </svg>
                            Étudiants
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={"/companies"}
                            className={`flex items-center gap-3 rounded-lg ${isActivePage("/companies") ? "bg-blue-600 text-white": ""} px-4 py-3 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                            </svg>
                            Entreprises
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={"/admin/internships/create"}
                            className={`flex items-center gap-3 rounded-lg ${isActivePage("/admin/internships/create") ? "bg-blue-600 text-white": ""} px-4 py-3 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Ajouter un stage
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={"/admin/teachers/create"}
                            className={`flex items-center gap-3 rounded-lg ${isActivePage("/admin/teachers/create") ? "bg-blue-600 text-white": ""} px-4 py-3 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Ajouter un professeur
                        </Link>
                    </li>
                </ul>

                <div className="mt-8 border-t border-gray-200 pt-4">
                    <Link
                        href={"/logout"}
                        method="post"
                        as="button"
                        className="mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition-colors hover:bg-red-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                        Déconnexion
                    </Link>
                </div>
            </nav>
        </aside>
    );
}
