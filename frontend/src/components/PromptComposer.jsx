import { useState } from "react";
import {
  ArrowUp,
  Bot,
  ChevronDown,
  Mic,
  Paperclip,
  Sparkles,
} from "lucide-react";

export default function PromptComposer({
  initialValue = "",
  onSubmit,
  placeholder = "Describe what you want the agents to do...",
  variant = "marketing",
}) {
  const [prompt, setPrompt] = useState(initialValue);
  const [mode, setMode] = useState("agent");

  const isWorkspace = variant === "workspace";

  function handleSubmit(event) {
    event.preventDefault();

    const cleanPrompt = prompt.trim();

    if (!cleanPrompt) {
      return;
    }

    onSubmit?.({
      prompt: cleanPrompt,
      mode,
    });

    if (isWorkspace) {
      setPrompt("");
    }
  }

  const composer = (
    <form
      className={isWorkspace ? "workspace-composer" : "prompt-card"}
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor={`${variant}-prompt`}>
        Enter your prompt
      </label>

      <textarea
        className={isWorkspace ? "" : "prompt-textarea"}
        id={`${variant}-prompt`}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder={placeholder}
        value={prompt}
      />

      <div className={isWorkspace ? "composer-footer" : "prompt-toolbar"}>
        <div className={isWorkspace ? "composer-group" : "prompt-toolbar-left"}>
          <button
            aria-label="Attach a file"
            className="icon-button"
            type="button"
          >
            <Paperclip size={19} strokeWidth={1.8} />
          </button>

          <button
            className={`composer-control ${mode === "agent" ? "active" : ""}`}
            onClick={() => setMode("agent")}
            type="button"
          >
            <Bot size={17} strokeWidth={1.8} />
            <span>Agent</span>
          </button>

          <button
            className={`composer-control hide-mobile ${
              mode === "ask" ? "active" : ""
            }`}
            onClick={() => setMode("ask")}
            type="button"
          >
            <Sparkles size={17} strokeWidth={1.8} />
            <span>Ask</span>
          </button>
        </div>

        <div
          className={isWorkspace ? "composer-group" : "prompt-toolbar-right"}
        >
          {isWorkspace && (
            <>
              <button className="composer-control hide-mobile" type="button">
                <span>Auto</span>
                <ChevronDown size={15} />
              </button>

              <button className="composer-control hide-mobile" type="button">
                Plan
              </button>

              <button
                aria-label="Use microphone"
                className="icon-button"
                type="button"
              >
                <Mic size={18} strokeWidth={1.8} />
              </button>
            </>
          )}

          <button
            aria-label="Submit prompt"
            className="send-button"
            disabled={!prompt.trim()}
            type="submit"
          >
            <ArrowUp size={19} strokeWidth={2} />
          </button>
        </div>
      </div>
    </form>
  );

  if (isWorkspace) {
    return composer;
  }

  return <div className="prompt-area">{composer}</div>;
}
