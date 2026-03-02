import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";
import "./MessageContent.css";

interface Props {
  content: string;
}

export function MessageContent({ content }: Props) {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          img: ({ src, alt }) => {
            if (!src) return null;
            // Render video links inline if the extension suggests it
            if (/\.(mp4|webm|ogg)(\?|$)/i.test(src)) {
              return (
                <video src={src} controls style={{ maxWidth: "100%", borderRadius: "6px" }}>
                  <track kind="captions" />
                </video>
              );
            }
            return <img src={src} alt={alt ?? ""} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
