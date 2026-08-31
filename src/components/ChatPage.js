import "../styles/ChatPortal.css"
import { useState, useEffect, useContext } from "react";
import Conversation from "./Conversation";

function ChatPage(){
    const [query, setQuery] = useState("");
    const [chats, setChats] = useState([]);

    async function handleRunAgent(){
        setQuery("");
        let userMessage = {
            role: "user",
            message: query
        }
        setChats(prev => [...(prev || []), userMessage]);

        let response = await fetch('http://localhost:8000/chat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query: query})
        });
        let agentResponse = await response.json();
        let agentMessage = {
            role: "agent",
            message: agentResponse
        }
        setChats(prev => [...(prev || []), agentMessage]);
    }

    return(
        <div className="chatPage">
            <div className="conversation-main">
                <Conversation chatMessages={chats} />
                <div className="input-container">
                    <input placeholder="Ask anything..." className="query-input" value={query}
                    onChange={(e) => {setQuery(e.target.value)}} 
                    onKeyDown={(e) => {if(e.key === "Enter"){handleRunAgent()}}}/>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;