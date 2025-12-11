import { usePage } from '@inertiajs/react';

export default function useAuth() {
    // On récupère les props globales partagées par Inertia
    const { auth } = usePage().props;

    // @ts-ignore
    const user = auth.user;

    return {
        user: user,
        isLogged: !!user,
        isAdmin: user?.role === 'admin',
        isStudent: user?.role === 'student',
    };
}
