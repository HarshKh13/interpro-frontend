import { useState } from "react";
import "../styles/Protein.css"

function ProteinCard({ protein }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="protein-card">
            <div className="protein-header" onClick={() => setExpanded(!expanded)}>
                <span> Protein {protein.accession} </span>
                <span> {expanded ? "▲" : "▼"} </span>
            </div>

            {expanded && (
                <div className="protein-details">
                    {protein.name != null && (<p> <strong>Name:</strong>{" "}<code>{protein.name}</code></p>)}
                    {protein.description != null && (<p><strong>Description:</strong>{" "}<code>{protein.description}</code></p>)}
                    {protein.taxon_id != null && (<p><strong>Taxon ID:</strong>{" "}<code>{protein.taxon_id}</code></p>)}
                    {protein.length != null && (<p><strong>Length:</strong>{" "}<code>{protein.length}</code></p>)}
                    {protein.gene != null && (<p><strong>Gene:</strong>{" "}<code>{protein.gene}</code></p>)}
                    {protein.proteome != null && (<p><strong>Proteome:</strong>{" "}<code>{protein.proteome}</code></p>)}
                    {protein.go_terms != null && (<p><strong>GO terms:</strong>{" "}<code>{protein.go_terms.join(", ")}</code></p>)}
                    {protein.entities != null && (<p><strong>Entities:</strong>{" "}<code>{protein.entities.join(", ")}</code></p>)}
                    {protein.sequence != null && (<div><strong>Sequence:</strong><pre className="protein-sequence">{protein.sequence}</pre></div>)}
                </div>
            )}
        </div>
    );
}

export default ProteinCard;