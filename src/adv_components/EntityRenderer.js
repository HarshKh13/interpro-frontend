
import { useState } from "react";
import ProteinCard from "./ProteinRenderer";

function EntityCard({ entity }) {
    const [expanded, setExpanded] = useState(false);

    if (!entity) return null;

    const proteins = entity.proteins ?? [];
    const literatures = entity.literatures ?? [];

    return (
        <div className="result-card">
            <button
                type="button"
                className="result-header"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
            >
                <span>
                    <strong>Entity</strong> {entity.accession}
                    <span className="result-subtitle">
                        {" — "}{entity.name}
                    </span>
                </span>
                <span>{expanded ? "▲" : "▼"}</span>
            </button>

            {expanded && (
                <div className="result-details">
                    <p>
                        <strong>Type:</strong> {entity.type}
                    </p>

                    {entity.description && (
                        <p>
                            <strong>Description:</strong>{" "}
                            {entity.description}
                        </p>
                    )}

                    {literatures.length > 0 && (
                        <div className="result-field">
                            <h4>Associated literature</h4>

                            {literatures.map((literature) => (
                                <div
                                    className="literature-item"
                                    key={literature.id}
                                >
                                    <strong>{literature.title}</strong>

                                    {literature.url && (
                                        <a
                                            href={literature.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Open publication ↗
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="result-field">
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
                </div>
            )}
        </div>
    );
}

export default EntityCard;
