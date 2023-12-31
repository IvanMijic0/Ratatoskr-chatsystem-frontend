import { QueryClient, QueryClientProvider } from "react-query";
import { FC } from "react";

import { ReactQueryWrapperProps } from "../../types";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 2,
			refetchOnWindowFocus: false,
		},
	},
});

const ReactQueryWrapper: FC<ReactQueryWrapperProps> = ( { children } ) => {
	return <QueryClientProvider client={ queryClient }>{ children }</QueryClientProvider>;
};

export default ReactQueryWrapper;