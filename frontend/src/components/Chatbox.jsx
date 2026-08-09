import { defaultFeatures } from "./landigPage/featureMenu.data";

function Chatbox() {
  return (
    <div className="flex h-full w-full items-center justify-center p-2">
      <div className="flex w-full max-w-3xl flex-col items-center justify-center px-4 pb-[8%] sm:p-6">
        <div className="rounded-pill border-warm text-warm border bg-orange-400/10 px-4 py-1 text-sm">
          🧡 Loved by customers
        </div>

        <h1 className="font-grotesk text-text mt-6 w-full text-center text-3xl font-medium tracking-tight sm:text-4xl">
          Build, Run & Grow your business
        </h1>

        <textarea
          placeholder="Type your ideas here..."
          className="rounded-card border-secondary bg-surface-raised text-text placeholder:text-text-muted focus:border-accent mt-6 h-36 w-full resize-none border p-4 transition-colors outline-none"
        />

        <div className="scrollbar-width:none mt-4 flex w-full gap-2 overflow-x-auto pb-1 whitespace-nowrap [&::-webkit-scrollbar]:hidden">
          {defaultFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <button
                key={feature.id}
                type="button"
                className="rounded-pill bg-surface text-text-soft hover:border-border-strong hover:bg-surface-hover hover:text-text inline-flex shrink-0 items-center gap-2 border-[0.5px] border-white/20 px-3 py-1.5 text-sm transition-colors"
              >
                <Icon className="size-4" />
                <span>{feature.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
