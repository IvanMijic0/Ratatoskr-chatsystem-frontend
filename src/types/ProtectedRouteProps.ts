import { ComponentType } from "react";

type ProtectedRouteProps = {
    redirectTo?: string;
    renderComponentIfAuthenticated?: boolean;
    component: ComponentType<any>;
    fallbackComponent?: ComponentType<any>;
};

export default ProtectedRouteProps;
