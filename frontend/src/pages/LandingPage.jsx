const capabilities = [
  {
    icon: "M",
    title: "Multi-agent orchestration",
    description:
      "Coordinate specialized agents for planning, coding, testing, and review in one shared workspace.",
  },
  {
    icon: "C",
    title: "Code-aware execution",
    description:
      "Generate, refactor, and ship changes with context from your repo, terminals, and product goals.",
  },
  {
    icon: "W",
    title: "Workflow automation",
    description:
      "Turn repetitive product and engineering tasks into repeatable agent flows with clear approvals.",
  },
];

const steps = [
  "Connect your workspace and import the project context.",
  "Assign a planning agent, a coding agent, and a review agent.",
  "Ship features faster with traceable changes and human checkpoints.",
];

const trustItems = [
  "Repo-aware code generation",
  "Human-in-the-loop approvals",
  "Secure auth and team access",
  "Fast iteration for product teams",
];

function LandingPage({ onPrimaryAction }) {
  return (
    <main className="landing-shell">
      <section className="hero-panel">
        <div className="hero-glow hero-glow-left" />
        <div className="hero-glow hero-glow-right" />

        <div className="hero-copy">
          <span className="eyebrow">AI agents for shipping real software</span>

          <h1>
            Build with a multi-agent team that thinks like Codex, Claude Code,
            and your best engineer.
          </h1>

          <p className="hero-description">
            Orchestrate planning, implementation, review, and deployment from a
            single product workspace. Keep humans in the loop while agents
            handle the repetitive work.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="primary-cta"
              onClick={onPrimaryAction}
            >
              Start with Google
              <span aria-hidden="true">→</span>
            </button>

            <button type="button" className="secondary-cta">
              Explore product
            </button>
          </div>

          <ul className="trust-list">
            {trustItems.map((item) => (
              <li key={item}>
                <span className="trust-check" aria-hidden="true">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="hero-dashboard">
          <div className="dashboard-card dashboard-card-main">
            <div className="dashboard-header">
              <span className="dashboard-badge">Live orchestration</span>
              <span className="dashboard-status">3 agents active</span>
            </div>

            <div className="agent-stack">
              <div className="agent-row">
                <div className="agent-avatar agent-avatar-plan">P</div>
                <div>
                  <strong>Planner</strong>
                  <p>
                    Breaks the request into scoped tasks and acceptance checks.
                  </p>
                </div>
              </div>
              <div className="agent-row">
                <div className="agent-avatar agent-avatar-code">B</div>
                <div>
                  <strong>Builder</strong>
                  <p>
                    Writes the feature, updates UI, and keeps implementation
                    tight.
                  </p>
                </div>
              </div>
              <div className="agent-row">
                <div className="agent-avatar agent-avatar-review">R</div>
                <div>
                  <strong>Reviewer</strong>
                  <p>
                    Checks edge cases, catches regressions, and suggests fixes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card dashboard-card-code">
            <div className="code-window">
              <div className="code-dots">
                <span />
                <span />
                <span />
              </div>
              <pre>{`plan:
	- inspect repo
	- draft changes
	- validate behavior

status: ready to ship`}</pre>
            </div>
          </div>
        </aside>
      </section>

      <section className="stats-strip">
        <div>
          <strong>10x</strong>
          <span>faster feature iteration</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>agent coverage across tasks</span>
        </div>
        <div>
          <strong>1</strong>
          <span>workspace for planning to delivery</span>
        </div>
      </section>

      <section className="content-grid">
        <div className="section-card section-intro">
          <span className="section-label">Why teams use it</span>
          <h2>One product surface for prompting, building, and shipping.</h2>
          <p>
            Move from idea to implementation without bouncing between chat,
            editor, terminal, and review tools. The system keeps context intact
            and makes agent work visible.
          </p>
        </div>

        {capabilities.map((item) => (
          <article key={item.title} className="feature-card">
            <div className="feature-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="workflow-section">
        <div className="section-card workflow-copy">
          <span className="section-label">How it works</span>
          <h2>Simple enough for a startup, structured enough for a team.</h2>
          <p>
            Each request flows through a clear sequence so agents can do useful
            work without losing the product context.
          </p>
        </div>

        <ol className="workflow-steps">
          {steps.map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

export default LandingPage;
