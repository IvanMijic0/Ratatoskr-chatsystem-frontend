export {};

declare global {
	interface Window {
		stompClient;
	}
}

declare module 'stompjs' {
	export type Headers = { [key: string]: string };
}
