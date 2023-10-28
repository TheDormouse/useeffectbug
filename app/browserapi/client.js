"use client";
import { useState, useEffect } from "react";

export const BroadcastExample = () => {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  const bc = new BroadcastChannel("hello_world");
  // This causes issues with Browser API's running within useEffect
  // In this case, the cleanup function is actually executed on the first "dry" run of useEffect
  // This *does not* happen on production build, but renders next dev completely useless when using browser APIs
  useEffect(() => {
    console.log("useEffect run");
    bc.onmessage = (e) => {
      console.log("Received:", e.data);
      // Append the new message to the receivedMessages array
      setReceivedMessages((prevMessages) => [...prevMessages, e.data]);
    };

    return () => {
      console.log("CLEANUP");
      bc.close();
    };
  }, []);

  return (
    <>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="button"
        onClick={() => bc.postMessage(message)}
        value="Send"
      />
      <div>
        <h3>Received Messages:</h3>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
