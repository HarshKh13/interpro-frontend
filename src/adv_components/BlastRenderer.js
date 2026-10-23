
import { useState } from "react";

function HspCard({ blastHsp, index }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="result-card nested-card">
            <button
                type="button"
                className="result-header"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
            >
                <span>
                    <strong>HSP {index + 1}</strong>
                    {" — "}Bit score: {blastHsp.bit_score}
                    {" | "}E-value: {blastHsp.evalue}
                </span>
                <span>{expanded ? "▲" : "▼"}</span>
            </button>

            {expanded && (
                <div className="result-details">
                    <div className="hsp-stats">
                        <p><strong>Score:</strong> {blastHsp.score}</p>
                        <p><strong>Identity:</strong> {blastHsp.identity}</p>
                        <p><strong>Positive:</strong> {blastHsp.positive}</p>
                        <p><strong>Alignment length:</strong> {blastHsp.align_length}</p>
                        <p><strong>Gaps:</strong> {blastHsp.gaps}</p>
                        <p>
                            <strong>Query range:</strong>{" "}
                            {blastHsp.query_from}–{blastHsp.query_to}
                        </p>
                        <p>
                            <strong>Hit range:</strong>{" "}
                            {blastHsp.hit_from}–{blastHsp.hit_to}
                        </p>
                    </div>

                    <strong>Query sequence</strong>
                    <pre className="protein-sequence">
                        {blastHsp.query_sequence}
                    </pre>

                    {blastHsp.midline && (
                        <>
                            <strong>Alignment midline</strong>
                            <pre className="protein-sequence">
                                {blastHsp.midline}
                            </pre>
                        </>
                    )}

                    <strong>Hit sequence</strong>
                    <pre className="protein-sequence">
                        {blastHsp.hit_sequence}
                    </pre>
                </div>
            )}
        </div>
    );
}


function BlastCard({ blastHit }) {
    const [expanded, setExpanded] = useState(false);

    if (!blastHit) return null;

    return (
        <div className="result-card">
            <button
                type="button"
                className="result-header"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
            >
                <span>
                    <strong>BLAST Hit</strong>{" "}
                    {blastHit.accession}
                </span>
                <span>{expanded ? "▲" : "▼"}</span>
            </button>

            {expanded && (
                <div className="result-details">
                    <p>
                        <strong>Length:</strong>{" "}
                        {blastHit.length}
                    </p>

                    {(blastHit.hsps ?? []).map((hsp, index) => (
                        <HspCard
                            key={index}
                            blastHsp={hsp}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default BlastCard;
