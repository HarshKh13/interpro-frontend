
import AgentResponse from "./AgentResponse";


function Conversation({ chatMessages }) {
    return (
        <div className="conversation">
            {chatMessages.map((chatMessage) => (
                <div
                    key={chatMessage.id}
                    className={`message ${chatMessage.role}`}
                >
                    <div className="message-content">

                        {chatMessage.role === "user" && (
                            <div className="user-message">
                                {chatMessage.message}
                            </div>
                        )}

                        {chatMessage.role === "agent" && (
                            <AgentResponse
                                response={chatMessage.message}
                            />
                        )}

                        {chatMessage.role === "error" && (
                            <p className="error-message">
                                {chatMessage.message}
                            </p>
                        )}

                    </div>
                </div>
            ))}
        </div>
    );
}

export default Conversation;
