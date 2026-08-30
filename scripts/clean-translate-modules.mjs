import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');
const uiDir = join(__dirname, '..', 'src', 'ui');

const BLOG_EN_TRANSLATIONS = {
    'audience-intent-triage': {
        name: 'Audience & Intent Triage',
        desc: "Determines the reader's search intent and domain expertise level.",
        explain: 'Identifies whether the audience needs foundational concepts, practical implementation, or strategic comparison.',
        prompt: 'Triage target audience and search intent: Who is the reader? (Beginner, practitioner, executive). Is their intent informational, transactional, or comparative?'
    },
    'thesis-sharpener': {
        name: 'Thesis & Core Idea Sharpener',
        desc: 'Defines a single defensible, non-obvious, and compelling thesis statement.',
        explain: 'Avoids generic platitudes by honing a distinct and provocative angle.',
        prompt: 'Sharpen the core thesis statement in one clear sentence. Focus on a non-consensus, defensible angle rather than commonplace truths.'
    },
    'core-hook-extractor': {
        name: 'Critical Hook Architect',
        desc: 'Hooks reader attention within the first 3 seconds with compelling tension.',
        explain: 'Uses paradoxical questions, surprising data, or high-stakes micro-stories.',
        prompt: 'Craft 3 distinct opening hooks: (a) A counter-intuitive statistic, (b) A thought-provoking paradox, (c) A high-tension micro-narrative.'
    },
    'tone-authority-setter': {
        name: 'Tone & Authority Calibrator',
        desc: 'Calibrates editorial register to pragmatic, seasoned, and authoritative.',
        explain: 'Eliminates salesy marketing jargon in favor of direct editorial substance.',
        prompt: 'Set editorial tone: Establish a senior editor voice that is authoritative yet accessible, direct, and free from promotional fluff.'
    },
    'value-prop-alignment': {
        name: 'Value Proposition Alignment',
        desc: "Aligns the post's takeaways with immediate reader utility.",
        explain: 'Ensures the reader gains concrete, actionable value from every section.',
        prompt: 'Align the value proposition: Explicitly define what tangible skill, mental model, or insight the reader will master after reading.'
    },
    'anti-fluff-filter': {
        name: 'Anti-Fluff & Density Filter',
        desc: 'Purges filler prose and maximizes information density per paragraph.',
        explain: 'Eliminates redundant transitions and conversational filler.',
        prompt: 'Apply the anti-fluff filter: Maximize information density by cutting generic intros, redundant adverbs, and repetitive explanations.'
    },
    'data-benchmark-anchor': {
        name: 'Data & Benchmark Anchor',
        desc: 'Grounds arguments with empirical data, industry benchmarks, and metrics.',
        explain: 'Replaces vague claims with concrete numerical evidence.',
        prompt: 'Anchor arguments with empirical benchmarks, research statistics, and verified quantitative data.'
    },
    'case-study-extractor': {
        name: 'Case Study & Real-World Proof',
        desc: 'Illustrates core claims with real-world case studies and outcomes.',
        explain: 'Provides tangible proof through organizational or technical examples.',
        prompt: 'Extract and present a concrete case study showing the principle in action with measurable outcomes.'
    },
    'first-principles-proof': {
        name: 'First-Principles Proof',
        desc: 'Proves claims from foundational mechanical and causal principles.',
        explain: 'Avoids appeal to authority by demonstrating causal mechanics directly.',
        prompt: 'Construct a first-principles proof: Deduce why this conclusion holds true from fundamental technical or logical axioms.'
    },
    'expert-quote-curator': {
        name: 'Expert Quote & Literature Anchor',
        desc: 'Curates authoritative quotes and seminal literature references.',
        explain: 'Adds intellectual weight and historical context to the narrative.',
        prompt: 'Curate seminal expert perspectives and literature citations that reinforce the thesis with intellectual depth.'
    },
    'metric-roi-calculator': {
        name: 'Metric & ROI Framework',
        desc: 'Quantifies the business, engineering, or cognitive ROI of the concept.',
        explain: 'Helps decision-makers evaluate the payoff of implementation.',
        prompt: 'Build an ROI framework: Calculate time saved, cost reduction, or performance gains associated with this approach.'
    },
    'source-credibility-check': {
        name: 'Source Credibility Audit',
        desc: 'Audits citation validity, sample sizes, and empirical rigor.',
        explain: 'Filters out outdated or dubious secondary citations.',
        prompt: 'Audit source credibility: Verify sample validity, primary publication authority, and methodology limitations.'
    },
    'steelman-counter-arg': {
        name: 'Steelman Counter-Argument',
        desc: 'Presents the strongest possible opposing argument before refuting it.',
        explain: 'Enhances credibility by defeating the best version of rival viewpoints.',
        prompt: 'Steelman the primary counter-argument: Articulate the opposing perspective in its most formidable form before dismantling it.'
    },
    'cognitive-blindspot-detector': {
        name: 'Cognitive Blindspot Detector',
        desc: 'Exposes industry assumptions, survivorship bias, and echo-chamber myths.',
        explain: 'Highlights what standard industry discourse consistently ignores.',
        prompt: 'Expose cognitive blindspots and industry echo-chamber dogmas that distort objective understanding of this topic.'
    },
    'edge-case-destructor': {
        name: 'Edge-Case & Boundary Stress Test',
        desc: 'Tests where the advice breaks down and when NOT to use it.',
        explain: 'Prevents dogmatic application by outlining boundary conditions.',
        prompt: 'Stress-test boundary conditions: Detail specific edge cases, scale thresholds, or scenarios where this recommendation fails.'
    },
    'devil-advocate-audit': {
        name: "Devil's Advocate Audit",
        desc: "Challenges the premise with ruthless skepticism from a critic's lens.",
        explain: 'Simulates hostile peer feedback to pre-empt valid objections.',
        prompt: "Perform a Devil's Advocate audit: Interrogate the weakest assumptions and potential points of failure with ruthless critique."
    },
    'nuance-polarity-balancer': {
        name: 'Nuance & False Dilemma Balancer',
        desc: 'Dismantles false dichotomies and articulates subtle tradeoffs.',
        explain: 'Replaces simplistic binary choices with nuanced situational spectrums.',
        prompt: 'Balance false dichotomies (e.g. A vs B): Present the synthesis and nuanced tradeoffs dependent on context and maturity.'
    },
    'assumption-inversion': {
        name: 'Assumption Inversion',
        desc: 'Inverts fundamental assumptions to uncover breakthrough perspectives.',
        explain: 'Explores what happens if the opposite premise is assumed.',
        prompt: 'Invert the core assumption: What if the opposite of the accepted dogma is true? Explore the resulting implications.'
    },
    'scannable-subheadings': {
        name: 'Scannable Subheading Architecture',
        desc: 'Structures headers as informative takeaway statements for skim-readers.',
        explain: 'Enables busy readers to grasp the entire argument in under 30 seconds.',
        prompt: 'Draft informative, takeaway-driven subheadings: Every H2/H3 should convey a distinct thesis rather than generic topical labels.'
    },
    'narrative-arc-framework': {
        name: 'Narrative Arc & Story Framework',
        desc: 'Orchestrates emotional and intellectual pacing (Hook -> Conflict -> Resolution).',
        explain: 'Maintains narrative tension across long-form analysis.',
        prompt: 'Structure the narrative arc: Guide the reader through context establishment, rising tension/conflict, revelation, and actionable resolution.'
    },
    'tldr-executive-box': {
        name: 'TL;DR & Executive Summary Box',
        desc: 'Creates a compact summary callout box for rapid scanning.',
        explain: 'Provides a 3-bullet executive synthesis at the top of the article.',
        prompt: 'Craft a compact TL;DR executive summary box: Deliver the entire premise, main proof, and core takeaway in 3 concise bullets.'
    },
    'takeaway-action-matrix': {
        name: 'Actionable Takeaway Matrix',
        desc: 'Translates abstract insights into a concrete checklist and action plan.',
        explain: 'Empowers the reader to implement findings immediately.',
        prompt: 'Build an actionable takeaway matrix: Convert analytical insights into step-by-step implementation tasks.'
    },
    'cognitive-pacing-rhythm': {
        name: 'Cognitive Pacing & Rhythm',
        desc: 'Alternates between dense technical analysis and light conceptual summaries.',
        explain: 'Maintains reader focus and prevents cognitive fatigue.',
        prompt: 'Calibrate pacing and sentence rhythm: Alternate between analytical deep dives, visual examples, and punchy single-sentence summaries.'
    },
    'call-to-action-closer': {
        name: 'High-Impact CTA Closer',
        desc: 'Concludes with an inspiring, provocative, or actionable next step.',
        explain: 'Leaves a memorable closing impression without generic sign-offs.',
        prompt: 'Write a high-impact conclusion: Deliver a memorable closing synthesis and a clear, compelling call to action.'
    },
    'ai-cliche-purger': {
        name: 'AI Cliche & Buzzword Purger',
        desc: "Eliminates AI markers like 'delve', 'testament', 'tapestry', and buzzwords.",
        explain: 'Ensures genuine human voice, craft, and distinctive style.',
        prompt: "Purge AI clichés and boilerplate markers ('delve into', 'in today's fast-paced world', 'beacon of', 'testament to')."
    },
    'passive-voice-eliminator': {
        name: 'Passive Voice & Weak Verb Eliminator',
        desc: 'Converts passive constructions into vigorous, active-voice statements.',
        explain: 'Injects dynamism and clarity into every sentence.',
        prompt: 'Eliminate passive voice and nominalizations: Transform passive verbs into direct, forceful, active-voice constructions.'
    },
    'jargon-simplifier': {
        name: 'Jargon & Complexity Simplifier',
        desc: 'Demystifies esoteric terms into lucid, accessible terminology.',
        explain: 'Preserves conceptual precision while eliminating needless obscurity.',
        prompt: 'Demystify domain jargon: Explain complex technical terms immediately using intuitive plain language.'
    },
    'redundancy-trimmer': {
        name: 'Redundancy & Word Count Trimmer',
        desc: 'Cuts redundant modifiers, tautologies, and bloated phrasing.',
        explain: 'Reduces total word count by 20% while increasing communicative power.',
        prompt: 'Trim linguistic redundancies, duplicate modifiers, and conversational throat-clearing.'
    },
    'readability-flesch-boost': {
        name: 'Readability & Scannability Boost',
        desc: 'Optimizes sentence length and readability for high comprehension.',
        explain: 'Targets balanced Flesch-Kincaid grade level for effortless reading.',
        prompt: 'Optimize readability: Break overly long compound sentences, vary sentence lengths, and format key lists cleanly.'
    },
    'punchline-finisher': {
        name: 'Punchline & Resonance Finisher',
        desc: 'Polishes section endings with memorable aphoristic punchlines.',
        explain: 'Ensures key insights stick firmly in the reader\'s long-term memory.',
        prompt: 'Craft resonant closing punchlines for major sections: End each thought block with an unforgettable, insightful takeaway.'
    }
};

function run() {
    const files = readdirSync(dataDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
        const filePath = join(dataDir, file);
        const raw = readFileSync(filePath, 'utf8');
        const modules = JSON.parse(raw);

        const cleaned = modules.map((m) => {
            let name = m.name;
            let desc = m.desc || m.description;
            let explain = m.explain || desc;
            let prompt = m.prompt;

            // Apply Blog EN translations
            if (file === 'modules_blog_en.json' && BLOG_EN_TRANSLATIONS[m.id]) {
                const tr = BLOG_EN_TRANSLATIONS[m.id];
                name = tr.name;
                desc = tr.desc;
                explain = tr.explain;
                prompt = tr.prompt;
            }

            // Standardize canonical field order, omitting redundant 'category' and 'description'
            return {
                id: m.id,
                icon: m.icon,
                name,
                desc,
                explain,
                layer: m.layer || m.category,
                requires: m.requires || [],
                prompt
            };
        });

        writeFileSync(filePath, JSON.stringify(cleaned, null, 2) + '\n', 'utf8');
        console.log(`Cleaned and standardized ${file} (${cleaned.length} modules)`);
    }

    console.log('All 30 module data files standardized!');
}

run();
