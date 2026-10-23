
import { useState } from "react";

function OrthologCard({ result }) {
    const [expanded, setExpanded] = useState(false);

    if (!result) return null;

    const candidates = result.results ?? [];

    return (
        <div className="result-card">
            <button
                type="button"
                className="result-header"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
            >
                <span>
                    <strong>
                        {result.source_accession ??
                            result.source_organism ??
                            "Ortholog Analysis"}
                    </strong>
                    {" → "}
                    {result.target_organism ?? "Target organism"}
                    <span className="result-count">
                        {candidates.length} candidates
                    </span>
                </span>
                <span>{expanded ? "▲" : "▼"}</span>
            </button>

            {expanded && (
                <div className="result-details">
                    <p>
                        <strong>Source protein:</strong>{" "}
                        {result.source_accession ?? "Not provided"}
                    </p>

                    <p>
                        <strong>Source organism:</strong>{" "}
                        {result.source_organism ?? "Unknown"}
                    </p>

                    <p>
                        <strong>Target organism:</strong>{" "}
                        {result.target_organism ?? "Unknown"}
                    </p>

                    <p>
                        <strong>Method:</strong>{" "}
                        {result.method ?? "Local BLASTP + reciprocal best hit"}
                    </p>

                    <p>
                        <strong>RBH candidates:</strong>{" "}
                        {result.rbh_count ??
                            candidates.filter(
                                (item) => item.reciprocal_best_hit
                            ).length}
                    </p>

                    {candidates.length === 0 ? (
                        <p className="empty-text">
                            No ortholog candidates found.
                        </p>
                    ) : (
                        <div className="ortholog-table-wrapper">
                            <table className="ortholog-table">
                                <thead>
                                    <tr>
                                        <th>Accession</th>
                                        <th>Identity</th>
                                        <th>Query coverage</th>
                                        <th>E-value</th>
                                        <th>RBH</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {candidates.map((candidate, index) => (
                                        <tr
                                            key={
                                                candidate.accession ??
                                                index
                                            }
                                        >
                                            <td>
                                                {candidate.accession}
                                            </td>
                                            <td>
                                                {candidate.identity_percent ?? "—"}%
                                            </td>
                                            <td>
                                                {candidate.query_coverage_percent ?? "—"}%
                                            </td>
                                            <td>
                                                {candidate.evalue ?? "—"}
                                            </td>
                                            <td>
                                                {candidate.reciprocal_best_hit
                                                    ? "Yes"
                                                    : "No"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {result.caveat && (
                        <p className="empty-text">
                            {result.caveat}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default OrthologCard;
