import Stomp from 'stompjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SockJS from 'sockjs-client/dist/sockjs';

class WebSocketService {
	private stompClient: Stomp.Client | null = null;

	constructor( private serverUrl: string ) {
	}

	connect( onConnect: () => void = () => {
	}, onError: () => void = () => {
	} ): Promise<void> {
		return new Promise<void>(( resolve, reject ) => {
			if ( this.stompClient && this.stompClient.connected ) {
				resolve();
			} else {
				const socket = new SockJS(this.serverUrl);

				this.stompClient = Stomp.over(socket);

				this.stompClient.debug = () => {
				};

				this.stompClient.connect(
					{},
					() => {
						console.log('WebSocket connected!');
						onConnect(); // Call onConnect callback
						resolve();
					},
					( error: any ) => {
						console.error('WebSocket connection failed:', error);
						onError(); // Call onError callback
						reject(error);
					}
				);
			}
		});
	}

	disconnect(): void {
		if ( this.stompClient ) {
			this.stompClient.disconnect(() => console.log('WebSocket disconnected!'));
			this.stompClient = null;
		}
	}

	public subscribe( channel: string, callback: ( message: Stomp.Message ) => void ): void {
		if ( this.stompClient && this.stompClient.connected ) {
			console.log('Subscribing to channel:', channel);
			this.stompClient.subscribe(channel, callback);
		}
	}

	public unsubscribe( channel: string ): void {
		if ( this.stompClient && this.stompClient.connected ) {
			this.stompClient.unsubscribe(channel);
		}
	}

	public send( destination: string, headers: Stomp.Headers, body: any ): void {
		if ( this.stompClient && this.stompClient.connected ) {
			this.stompClient.send(destination, headers, JSON.stringify(body));
		}
	}
}

const webSocketService = new WebSocketService(import.meta.env.VITE_REACT_APP_BACKEND_WS_URL);
export default webSocketService;