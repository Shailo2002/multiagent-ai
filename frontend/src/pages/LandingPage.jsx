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
      landing page
    </main>
  );
}

export default LandingPage;
