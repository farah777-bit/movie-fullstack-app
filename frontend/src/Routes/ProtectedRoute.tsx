import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Context/UserAuth';

type Props = { children: ReactNode }

const ProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    console.log(isLoggedIn())
    return (
        isLoggedIn() ?
            (<>
                {children}
            </>) :
            (
                <Navigate to="/login" replace state={{ from: location }} />
            )
    )
}

export default ProtectedRoute