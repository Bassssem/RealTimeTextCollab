import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessage(data.message);
    });
  }, [socket]);

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Chat Room</h2>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Room Number..."
                  onChange={(event) => {
                    setRoom(event.target.value);
                  }}
                />
              </div>

             <button
                className="btn btn-primary btn-block"
                onClick={joinRoom}
              >
                Join Room
              </button>
           
              <h1 className="mt-4 text-center">Message:</h1>

              <textarea
                className="form-control"
                placeholder="Message..."
                value={message}
                cols={50}
                rows={5}
                onChange={(event) => {
                  setMessage(event.target.value);
                  socket.emit("send_message", { message, room });
                }}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
