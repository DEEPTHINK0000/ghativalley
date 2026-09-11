let socket: WebSocket | null = null;

export function connectSocket(
  onMessage: (data: unknown) => void
) {
  socket = new WebSocket(
    "ws://localhost:5000/ws"
  );

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      onMessage(data);
    } catch {
      console.error(
        "Invalid WebSocket message"
      );
    }
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return socket;
}

export function closeSocket() {
  socket?.close();
  socket = null;
}