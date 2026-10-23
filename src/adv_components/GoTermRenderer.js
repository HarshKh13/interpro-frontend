
import { useState } from "react";
import ProteinCard from "./ProteinRenderer";

function GoTermCard({ goTerm }) {
    const [expanded, setExpanded] = useState(false);

    if (!goTerm) return null;

    const proteins = goTerm.proteins ?? [];

    return (
        <div className="result-card">
            <button
                type="button"
                className="result-header"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
            >
                <span>
                    <strong>GO Term</strong> {goTerm.id}
                    <span className="result-subtitle">
                        {" — "}{goTerm.name}
                    </span>
                </span>
                <span>{expanded ? "▲" : "▼"}</span>
            </button>

            {expanded && (
                <div className="result-details">
                    <p>
                        <strong>Category:</strong>{" "}
                        {goTerm.category}
                    </p>

                    <h4>
                        Associated proteins (up to 10 shown):
                        {" "}{proteins.length}
                    </h4>

                    {proteins.length > 0 ? (
                        proteins.map((protein) => (
                            <ProteinCard
                                key={protein.accession}
                                protein={protein}
                            />
                        ))
                    ) : (
                        <p className="empty-text">
                            No protein summaries included.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default GoTermCard;
