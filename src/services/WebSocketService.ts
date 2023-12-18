import Stomp from 'stompjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SockJS from "sockjs-client/dist/sockjs";

class WebSocketService {
	private stompClient: Stomp.Client | null = null;

	constructor( private serverUrl: string ) {
	}

	connect( onConnected: () => void, onError: () => void ): void {
		this.disconnect();

		const socket = new SockJS(this.serverUrl);

		this.stompClient = Stomp.over(socket);

		this.stompClient.connect({}, onConnected, onError);
	}

	disconnect(): void {
		if ( this.stompClient ) {
			this.stompClient.disconnect(() => console.log("WebSocket disconnected!"));
			this.stompClient = null;
		}
	}

	public subscribe( channel: string, callback: ( message: Stomp.Message ) => void ): void {
		if ( this.stompClient ) {
			this.stompClient.subscribe(channel, callback);
		}
	}

	public send( destination: string, headers: Stomp.Headers, body: any ): void {
		if ( this.stompClient ) {
			this.stompClient.send(destination, headers, JSON.stringify(body));
		}
	}
}

const webSocketService = new WebSocketService(import.meta.env.VITE_REACT_APP_BACKEND_WS_URL);
export default webSocketService;