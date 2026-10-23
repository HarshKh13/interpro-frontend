
import { useState, useRef, useEffect } from "react";

import Conversation from "./Conversation";
import "../styles/ChatPortal.css";
import "../styles/Results.css";


function ChatPage() {
    const [query, setQuery] = useState("");
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);

    const endRef = useRef(null);
    const requestInFlight = useRef(false);
    const nextId = useRef(0);

    const newId = () => {
        nextId.current += 1;
        return nextId.current;
    };

    useEffect(() => {
        endRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [chats, loading]);


    async function handleRunAgent(event) {
        event.preventDefault();

        const currentQuery = query.trim();

        if (!currentQuery || requestInFlight.current) {
            return;
        }

        requestInFlight.current = true;
        setLoading(true);
        setQuery("");

        const userMessage = {
            id: newId(),
            role: "user",
            message: currentQuery
        };

        setChats((prev) => [
            ...prev,
            userMessage
        ]);

        try {
            const response = await fetch(
                "http://localhost:8000/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: currentQuery
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Server returned ${response.status}`
                );
            }

            const agentResponse = await response.json();

            const agentMessage = {
                id: newId(),
                role: "agent",
                message: agentResponse
            };

            setChats((prev) => [
                ...prev,
                agentMessage
            ]);

        } catch (error) {
            console.error("Agent request failed:", error);

            setChats((prev) => [
                ...prev,
                {
                    id: newId(),
                    role: "error",
                    message:
                        "Unable to retrieve research results. " +
                        "Please try again."
                }
            ]);

        } finally {
            requestInFlight.current = false;
            setLoading(false);
        }
    }


    return (
        <div className="chatPage">
            <div className="conversation-main">

                <div className="chat-heading">
                    <h2>Biological Research Assistant</h2>
                    <p>
                        Explore proteins, GO terms,
                        biological entities, and annotations.
                    </p>
                </div>

                <div className="conversation-scroll">
                    <Conversation chatMessages={chats} />

                    {loading && (
                        <div className="loading-message">
                            Searching biological data...
                        </div>
                    )}

                    <div ref={endRef} />
                </div>

                <form
                    className="input-container"
                    onSubmit={handleRunAgent}
                >
                    <input
                        className="query-input"
                        placeholder="Ask a biological research question..."
                        value={query}
                        disabled={loading}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="send-button"
                        disabled={loading || !query.trim()}
                    >
                        {loading ? "Running..." : "Send"}
                    </button>
                </form>

            </div>
        </div>
    );
}

export default ChatPage;
