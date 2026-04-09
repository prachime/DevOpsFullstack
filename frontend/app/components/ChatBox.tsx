"use client";

import { FormEvent, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

type Message = {
  id: number;
  role: "user" | "bot";
  text: string;
};

type ResponseItem = {
  title: string;
  views: number;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "bot", text: "Hi! I am your chatbot. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [responseData, setResponseData] = useState<ResponseItem[]>([]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: trimmed }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const result: { message?: string; data?: ResponseItem[] } =
        await response.json();

      // ✅ Debug API response
      console.log("API RESULT:", result);

      const botMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: result.message ?? "I received your message.",
      };

      setMessages((prev) => [...prev, botMessage]);

      // ✅ Spread operator ensures React detects state change & re-renders table/chart
      setResponseData(Array.isArray(result.data) ? [...result.data] : []);

      // ✅ Debug frontend state
      console.log("RESPONSE DATA:", result.data);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: "Sorry, I could not reach the API right now.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      setResponseData([]);
    }
  };

  return (
    <div
      style={{
        maxWidth: 520,
        margin: "40px auto",
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 16,
        fontFamily: "Arial, sans-serif",
        background: "#fff",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 12 }}>Simple Chatbot</h2>

      <div
        style={{
          height: 320,
          overflowY: "auto",
          border: "1px solid #eee",
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          background: "#fafafa",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent:
                msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                maxWidth: "75%",
                padding: "8px 12px",
                borderRadius: 12,
                lineHeight: 1.4,
                background: msg.role === "user" ? "#2563eb" : "#e5e7eb",
                color: msg.role === "user" ? "#fff" : "#111827",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: "10px 12px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            border: "none",
            borderRadius: 8,
            padding: "10px 14px",
            cursor: "pointer",
            background: "#111827",
            color: "#fff",
          }}
        >
          Send
        </button>
      </form>

      <div style={{ marginTop: 16 }}>
        <h3 style={{ margin: "0 0 8px 0", fontSize: 16 }}>Response Data</h3>
        {responseData.length === 0 ? (
          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 8,
              padding: 12,
              background: "#fafafa",
              color: "#6b7280",
              fontSize: 14,
            }}
          >
            No data available.
          </div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #eee",
              borderRadius: 8,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                <th
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    borderBottom: "1px solid #eee",
                    fontWeight: 600,
                  }}
                >
                  title
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "10px 12px",
                    borderBottom: "1px solid #eee",
                    fontWeight: 600,
                  }}
                >
                  views
                </th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((item, index) => (
                <tr key={`${item.title}-${index}`}>
                  <td
                    style={{
                      padding: "10px 12px",
                      borderBottom:
                        index === responseData.length - 1
                          ? "none"
                          : "1px solid #f3f4f6",
                    }}
                  >
                    {item.title}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      borderBottom:
                        index === responseData.length - 1
                          ? "none"
                          : "1px solid #f3f4f6",
                    }}
                  >
                    {item.views}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <h3 style={{ margin: "0 0 8px 0", fontSize: 16 }}>Views Trend</h3>
        {responseData.length === 0 ? (
          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 8,
              padding: 12,
              background: "#fafafa",
              color: "#6b7280",
              fontSize: 14,
            }}
          >
            No chart data available.
          </div>
        ) : (
          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 8,
              padding: 12,
              background: "#fff",
            }}
          >
            <LineChart width={480} height={240} data={responseData}>
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </div>
        )}
      </div>
    </div>
  );
}