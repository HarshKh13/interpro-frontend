
import { useState } from "react";

function ProteinCard({ protein }) {
    const [expanded, setExpanded] = useState(false);

    if (!protein) return null;

    const accession = protein.accession ?? "Unknown";
    const hasValue = (value) =>
        value !== null && value !== undefined && value !== "";

    return (
        <div className="result-card">
            <button
                type="button"
                className="result-header"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
            >
                <span>
                    <strong>Protein</strong> {accession}
                    {protein.name && (
                        <span className="result-subtitle">
                            {" — "}{protein.name}
                        </span>
                    )}
                </span>
                <span>{expanded ? "▲" : "▼"}</span>
            </button>

            {expanded && (
                <div className="result-details">
                    {hasValue(protein.name) && (
                        <p><strong>Name:</strong> {protein.name}</p>
                    )}

                    {hasValue(protein.description) && (
                        <p>
                            <strong>Description:</strong>{" "}
                            {protein.description}
                        </p>
                    )}

                    {hasValue(protein.taxon_id) && (
                        <p>
                            <strong>Taxon ID:</strong>{" "}
                            {protein.taxon_id}
                        </p>
                    )}

                    {hasValue(protein.length) && (
                        <p>
                            <strong>Length:</strong>{" "}
                            {protein.length} aa
                        </p>
                    )}

                    {hasValue(protein.gene) && (
                        <p><strong>Gene:</strong> {protein.gene}</p>
                    )}

                    {hasValue(protein.proteome) && (
                        <p>
                            <strong>Proteome:</strong>{" "}
                            {protein.proteome}
                        </p>
                    )}

                    {Array.isArray(protein.go_terms) &&
                        protein.go_terms.length > 0 && (
                            <div className="result-field">
                                <strong>GO terms:</strong>
                                <div className="tag-list">
                                    {protein.go_terms.map((goId) => (
                                        <span className="result-tag" key={goId}>
                                            {goId}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    {Array.isArray(protein.entities) &&
                        protein.entities.length > 0 && (
                            <div className="result-field">
                                <strong>Entities:</strong>
                                <div className="tag-list">
                                    {protein.entities.map((id) => (
                                        <span className="result-tag" key={id}>
                                            {id}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    {hasValue(protein.sequence) && (
                        <div className="result-field">
                            <strong>Sequence:</strong>
                            <pre className="protein-sequence">
                                {protein.sequence}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProteinCard;
