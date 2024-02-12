import { Navigate } from "react-router-dom";
import { FC } from "react";
import { useAppSelector } from "../hooks";
import { selectIsAuthenticated } from "../store";
import { ProtectedRouteProps } from "../types";
import { Guest } from "../pages";

const ProtectedGuestRoute: FC<ProtectedRouteProps> = ({
    redirectTo,
    component: Component,
    fallbackComponent: FallbackComponent,
    ...rest
}) => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    if (!isAuthenticated) return <Component {...rest} />;
    if (redirectTo) return <Navigate to={redirectTo} />;
    if (FallbackComponent) return <FallbackComponent {...rest} />;

    return <Guest />;
};

export default ProtectedGuestRoute;
