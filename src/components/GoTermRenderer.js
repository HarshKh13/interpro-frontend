import { useState } from "react";
import ProteinCard from "./ProteinRenderer";
import "../styles/GoTerm.css"

function GoTermCard({ goTerm }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="go-term-card">
            <div className="go-term-header" onClick={() => setExpanded(!expanded)}>
                <span><strong>GO Term</strong>{" "}{goTerm.id} {goTerm.name}</span>
                <span>{expanded ? "▲" : "▼"}</span>
            </div>

            {expanded && (
                <div className="go-term-details">
                    {goTerm.proteins?.map((protein) => (
                        <ProteinCard
                            key={protein.accession}
                            protein={protein}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

export default GoTermCard;