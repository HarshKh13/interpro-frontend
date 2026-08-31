import { useState } from "react";
import "../styles/Blast.css"

function BlastCard({ blastHit }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="blast-card">
            <div className="blast-header" onClick={() => setExpanded(!expanded)}>
                <span> <strong>Blast Hit</strong> {blastHit.accession}</span>
                <span> {expanded ? "▲" : "▼"}</span>
            </div>

            {expanded && (
                <div className="blast-details">
                    <p><strong>Length:</strong>{" "}<code>{blastHit.length}</code></p>
                    {blastHit.hsps?.map((blastHsp, index) => (<HspCard key={index} blastHsp={blastHsp}/>))}
                </div>
            )}
        </div>
    );
}


function HspCard({ blastHsp }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="hsp-card">
            <div className="hsp-header" onClick={() => setExpanded(!expanded)}>
                <span> <strong>Hsp</strong>{" "} bit-score: {blastHsp.bit_score}</span>
                <span> {expanded ? "▲" : "▼"}</span>
            </div>
            {expanded && (
                <div className="hsp-details">
                    <p> <strong>Query Sequence:</strong></p>
                    <pre>{blastHsp.query_sequence}</pre>
                    <p><strong>Hit Sequence:</strong></p>
                    <pre>{blastHsp.hit_sequence}</pre>
                </div>
            )}
        </div>
    );
}

export default BlastCard;