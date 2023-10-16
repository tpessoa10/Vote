import { Navigate } from "react-router-dom"
import { useAuth } from "./Auth"

interface ProtectedRoute{
    children:React.ReactNode
}

export function ProtectedRoute({children}:ProtectedRoute){
    const {isAuthenticated} = useAuth()

    if(!isAuthenticated){
        
        return <Navigate to="/" />
    }
    
    return children
}