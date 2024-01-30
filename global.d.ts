export {};

declare global {
	interface Window {
		stompClient;
		ethereum: any;
		signer: any;
		provider: any;
	}
}

declare module 'stompjs' {
	export type Headers = { [key: string]: string };
}
