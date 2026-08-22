import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import mermaid from "mermaid";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  securityLevel: "strict",

  themeVariables: {
    background: "#1d1d1f",

    primaryColor: "#243033",
    primaryTextColor: "#e7e7e9",
    primaryBorderColor: "#2d484d",

    secondaryColor: "#202022",
    secondaryTextColor: "#e7e7e9",
    secondaryBorderColor: "#303034",

    tertiaryColor: "#1a1a1a",

    lineColor: "#7e7e7e",

    textColor: "#e7e7e9",

    mainBkg: "#243033",

    nodeBorder: "#2d484d",

    clusterBkg: "#191919",
    clusterBorder: "#303034",

    edgeLabelBackground: "#191919",

    fontFamily: "Host Grotesk, sans-serif",
  },
});

const MermaidDiagram = ({ code }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const renderDiagram = async () => {
      if (!containerRef.current) return;

      try {
        const id = `mermaid-${crypto.randomUUID()}`;

        const { svg } = await mermaid.render(id, code);

        if (mounted && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error("Mermaid render error:", error);

        if (mounted && containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="rounded-control border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
              Failed to render diagram.
            </div>
          `;
        }
      }
    };

    renderDiagram();

    return () => {
      mounted = false;
    };
  }, [code]);

  return (
    <div className="rounded-card border-primary bg-surface my-5 overflow-x-auto border p-4">
      <div ref={containerRef} className="flex min-w-fit justify-center" />
    </div>
  );
};

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="rounded-card border-primary bg-canvas my-5 overflow-hidden border">
      <div className="border-primary bg-surface-raised flex items-center justify-between border-b px-4 py-2">
        <span className="text-soft font-mono text-xs">
          {language || "code"}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-control text-soft hover:bg-surface-hover hover:text-text px-2 py-1 text-xs transition-colors"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language || "text"}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "16px",
          background: "transparent",
          fontSize: "14px",
          lineHeight: "1.65",
        }}
        codeTagProps={{
          style: {
            fontFamily: '"Geist Mono", "SFMono-Regular", Consolas, monospace',
          },
        }}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const AiMarkdown = ({ content }) => {
  return (
    <div className="text-text min-w-0 text-[15px] leading-7">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1({ children }) {
            return (
              <h1 className="text-text mt-7 mb-4 text-2xl font-semibold tracking-tight first:mt-0">
                {children}
              </h1>
            );
          },

          h2({ children }) {
            return (
              <h2 className="text-text mt-7 mb-3 text-xl font-semibold tracking-tight first:mt-0">
                {children}
              </h2>
            );
          },

          h3({ children }) {
            return (
              <h3 className="text-text mt-5 mb-2 text-lg font-semibold">
                {children}
              </h3>
            );
          },

          p({ children }) {
            return (
              <p className="text-text my-3 first:mt-0 last:mb-0">{children}</p>
            );
          },

          strong({ children }) {
            return (
              <strong className="text-text font-semibold">{children}</strong>
            );
          },

          em({ children }) {
            return <em className="text-soft">{children}</em>;
          },

          ul({ children }) {
            return (
              <ul className="marker:text-muted my-3 list-disc space-y-1.5 pl-6">
                {children}
              </ul>
            );
          },

          ol({ children }) {
            return (
              <ol className="marker:text-soft my-3 list-decimal space-y-1.5 pl-6">
                {children}
              </ol>
            );
          },

          li({ children }) {
            return <li className="text-text pl-1">{children}</li>;
          },

          blockquote({ children }) {
            return (
              <blockquote className="rounded-r-control border-accent bg-accent/5 text-soft my-5 border-l-2 py-2 pr-3 pl-4">
                {children}
              </blockquote>
            );
          },

          hr() {
            return <hr className="border-primary my-7" />;
          },

          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent decoration-accent/40 hover:text-accent-hover font-medium underline underline-offset-4 transition-colors"
              >
                {children}
              </a>
            );
          },

          table({ children }) {
            return (
              <div className="rounded-card border-primary my-5 w-full overflow-x-auto border">
                <table className="w-full border-collapse text-sm">
                  {children}
                </table>
              </div>
            );
          },

          thead({ children }) {
            return <thead className="bg-surface-raised">{children}</thead>;
          },

          th({ children }) {
            return (
              <th className="border-primary text-text border-r border-b px-4 py-3 text-left font-semibold last:border-r-0">
                {children}
              </th>
            );
          },

          td({ children }) {
            return (
              <td className="border-primary text-soft border-r border-b px-4 py-3 last:border-r-0">
                {children}
              </td>
            );
          },

          tr({ children }) {
            return <tr className="last:[&>td]:border-b-0">{children}</tr>;
          },

          code({ className, children, ...props }) {
            const match = /language-([\w-]+)/.exec(className || "");

            const language = match?.[1];

            const code = String(children).replace(/\n$/, "");

            // fenced Mermaid code block
            if (language === "mermaid") {
              return <MermaidDiagram code={code} />;
            }

            // fenced normal code block
            if (language) {
              return <CodeBlock language={language} code={code} />;
            }

            // inline code
            return (
              <code
                className="border-primary bg-popup text-accent rounded-md border px-1.5 py-0.5 font-mono text-[0.9em]"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default AiMarkdown;
