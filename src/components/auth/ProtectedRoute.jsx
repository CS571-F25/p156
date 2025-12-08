import { useUser } from "../../contexts/SignedInStatus";


export default function ProtectedRoute({ children, requiredRole }) {
    const { user, setUser } = useUser();
    
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }
    
    return children;
}
