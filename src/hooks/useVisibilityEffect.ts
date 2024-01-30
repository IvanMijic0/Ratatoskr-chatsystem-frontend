import { useEffect } from 'react';

const useVisibilityEffect = ( onEffect: () => void ) => {
	useEffect(() => {
		const handleEffect = () => onEffect();
		const handleUnload = () => handleEffect();
		const handleVisibilityChange = () => handleEffect();

		window.addEventListener('beforeunload', handleUnload);
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			window.removeEventListener('beforeunload', handleUnload);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [onEffect]);
};

export default useVisibilityEffect;