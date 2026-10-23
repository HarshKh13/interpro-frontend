import ProteinCard from "./ProteinRenderer";
import GoTermCard from "./GoTermRenderer";
import BlastCard from "./BlastRenderer";

function Conversation({chatMessages}){
    
    function renderM(chatMessage){
        return(
            <div>
                {chatMessage.role === "user" && (<p>{chatMessage.message}</p>)}
                {chatMessage.role === "agent" && (
                    <>
                    {chatMessage.message.tool_node === "get_protein_data" && (<ProteinCard protein={chatMessage.message.query_protein}/>)}
                    {chatMessage.message.tool_node === "get_proteins_for_go_terms" && 
                    (chatMessage.message.go_terms[0].proteins.map((protein) => (<ProteinCard key={protein.accession} protein={protein}/>)))}
                    {chatMessage.message.tool_node === "get_proteins_for_go_term_functions" && 
                    (chatMessage.message.go_terms.map((go_term) => (<GoTermCard key={go_term.id} goTerm={go_term}/>)))}
                    {chatMessage.message.tool_node === "blast_search" && 
                    (chatMessage.message.blast_result.map((blast_hit) => <BlastCard blastHit={blast_hit}/>))}
                    </>
                )}
            </div>
        )
    }

    return(
        <div className="conversation">
            {chatMessages.map((chatMessage) => (
                <div className={`message ${chatMessage.role}`}>
                    <div className="message-content">{renderM(chatMessage)}</div>
                </div>
            ))}
        </div>
    );
}

export default Conversation;