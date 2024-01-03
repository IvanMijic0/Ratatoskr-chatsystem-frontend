import { useEffect } from 'react';

const useVisibilityUnload = ( onUnload: () => void, onVisibilityChange: ( isVisible: boolean ) => void ) => {
	useEffect(() => {
		const handleUnload = () => {
			onUnload();
		};

		const handleVisibilityChange = () => {
			onVisibilityChange(document.visibilityState === 'visible');
		};

		window.addEventListener('beforeunload', handleUnload);
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			window.removeEventListener('beforeunload', handleUnload);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [onUnload, onVisibilityChange]);
};

export default useVisibilityUnload;