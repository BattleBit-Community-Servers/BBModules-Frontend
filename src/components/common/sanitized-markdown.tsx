import ReactMarkdown from "react-markdown";
import { BBLink } from "../../components/common/link.tsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeSlug from "rehype-slug";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { Checkbox } from "../ui/checkbox.tsx";
import { CheckboxProps } from "@radix-ui/react-checkbox";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ImgurImage = ({ node = null as any, ...props }) => {
    const imgurRegex = /^https:\/\/(?:i\.)?imgur\.com\/[a-zA-Z0-9]+\.(?:[a-zA-Z]{3,4})(?:\?.*)?$/;

    if (imgurRegex.test(props.src)) {
        return <img src={props.src} alt={props.alt} title={props.title} />;
    }

    return <span className="text-red-500">Only images hosted on imgur are allowed</span>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExternalLink = ({ node = null as any, ...props }) => {
    if (props.href.startsWith("http") || props.href.startsWith("//")) {
        return (
            <BBLink to={`/redirect?url=${encodeURIComponent(props.href)}`} target="_blank" rel="noopener noreferrer">
                {props.children}
            </BBLink>
        );
    }

    return (
        <a {...props} className="relative text-primary transition-colors hover:text-blue-600 before:absolute before:bottom-0 before:left-0 before:right-0 before:h-0.5 before:w-full before:origin-center before:scale-0 before:bg-blue-600 before:transition-[transform] hover:before:scale-100" />
    );
};

export const SanitizedMarkdown = ({ markdown }: { markdown: string }) => {
    return (
        <ReactMarkdown
            className="markdown"
            components={{
                img: ImgurImage,
                a: ExternalLink,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <SyntaxHighlighter
                            {...props}
                            children={String(children).replace(/\n$/, "")}
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                        />
                    ) : (
                        <code {...props} className={className}>
                            {children}
                        </code>
                    );
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                input: ({ node, ...props }) => {
                    if (props.type === "checkbox") {
                        return <Checkbox {...props as CheckboxProps} />;
                    }

                    return <input {...props} />;
                }
            }}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize, rehypeSlug]}
            children={markdown}
        />
    );
};
