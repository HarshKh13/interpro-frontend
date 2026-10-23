
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import ProteinCard from "./ProteinRenderer";
import GoTermCard from "./GoTermRenderer";
import EntityCard from "./EntityRenderer";
import BlastCard from "./BlastRenderer";
import OrthologCard from "./OrthologyRenderer";


function ResultSection({ title, count, children }) {
    const [expanded, setExpanded] = useState(false);

    if (count === 0) return null;

    return (
        <section className="result-section">
            <button
                type="button"
                className="section-header"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
            >
                <span>
                    <strong>{title}</strong>
                    <span className="result-count">{count}</span>
                </span>

                <span>{expanded ? "▲" : "▼"}</span>
            </button>

            {expanded && (
                <div className="section-content">
                    {children}
                </div>
            )}
        </section>
    );
}


function AgentResponse({ response }) {
    if (!response) return null;

    const answer = response.answer ?? "";
    const query_protein = response.query_protein ?? null;
    const proteins = response.proteins ?? [];
    const go_terms = response.go_terms ?? [];
    const entities = response.entities ?? [];
    const blast_result = response.blast_result ?? [];
    const ortholog_results = response.ortholog_results ?? [];

    // Avoid displaying the same protein twice if
    // query_protein is also present in proteins.
    const uniqueProteins = [
        ...new Map(
            [
                ...(query_protein ? [query_protein] : []),
                ...proteins
            ].map((protein) => [
                protein.accession,
                protein
            ])
        ).values()
    ];

    return (
        <div className="agent-response">

            {/* Natural-language answer */}
            {answer && (
                <div className="answer-container">
                    <div className="answer-markdown">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {answer}
                        </ReactMarkdown>
                    </div>
                </div>
            )}

            {/* Structured data from GraphState */}
            <div className="structured-results">

                <ResultSection
                    title="Proteins"
                    count={uniqueProteins.length}
                >
                    {uniqueProteins.map((protein) => (
                        <ProteinCard
                            key={protein.accession}
                            protein={protein}
                        />
                    ))}
                </ResultSection>

                <ResultSection
                    title="GO Terms"
                    count={go_terms.length}
                >
                    {go_terms.map((goTerm) => (
                        <GoTermCard
                            key={goTerm.id}
                            goTerm={goTerm}
                        />
                    ))}
                </ResultSection>

                <ResultSection
                    title="Biological Entities"
                    count={entities.length}
                >
                    {entities.map((entity) => (
                        <EntityCard
                            key={entity.accession}
                            entity={entity}
                        />
                    ))}
                </ResultSection>

                <ResultSection
                    title="BLAST Results"
                    count={blast_result.length}
                >
                    {blast_result.map((blastHit, index) => (
                        <BlastCard
                            key={`${blastHit.accession}-${index}`}
                            blastHit={blastHit}
                        />
                    ))}
                </ResultSection>

                <ResultSection
                    title="Ortholog Analysis"
                    count={ortholog_results.length}
                >
                    {ortholog_results.map((result, index) => (
                        <OrthologCard
                            key={`${result.source_accession ?? "source"}-${result.target_taxon_id ?? index}`}
                            result={result}
                        />
                    ))}
                </ResultSection>

            </div>
        </div>
    );
}

export default AgentResponse;
