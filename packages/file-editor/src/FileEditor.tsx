import Editor from "@monaco-editor/react";

interface Props {
  value?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
}

export function FileEditor({ value, language = "markdown", onChange }: Props) {
  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={onChange}
      loading={null}
      options={{
        minimap: { enabled: false },
        wordWrap: "on",
        scrollBeyondLastLine: false,
        fontSize: 12,
        lineNumbersMinChars: 3,
        renderWhitespace: "none",
        overviewRulerLanes: 0,
      }}
    />
  );
}
