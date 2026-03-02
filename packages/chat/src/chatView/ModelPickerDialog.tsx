import { Dialog, DialogContent } from "@repo/ui-components/dialog";
import { useEffect, useRef, useState } from "react";
import { models, type ModelId } from "../models.js";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedModelId: ModelId;
  onSelect: (modelId: ModelId) => void;
}

const PROVIDER_COLORS: Record<string, string> = {
  Anthropic: "#c96442",
  OpenAI: "#1a1a1a",
  Google: "#4285f4",
};

function ModelIcon({ provider }: { provider: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        borderRadius: "4px",
        fontSize: "0.625rem",
        fontWeight: 700,
        backgroundColor: PROVIDER_COLORS[provider] ?? "#888",
        color: "#fff",
        flexShrink: 0,
      }}
    >
      {provider[0] ?? "?"}
    </span>
  );
}

export function ModelPickerDialog({ open, onClose, selectedModelId, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      searchRef.current?.focus();
    } else {
      setSearch("");
    }
  }, [open]);

  const providers = [...new Set(models.map((m) => m.provider))];
  const filtered = search ? models.filter((m) => m.name.toLowerCase().includes(search.toLowerCase())) : models;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: "12px", overflow: "hidden" } } }}
    >
      {/* Search bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 12px",
          gap: "8px",
          borderBottom: "1px solid var(--mui-palette-divider, #e0e0e0)",
        }}
      >
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{ flexShrink: 0, color: "var(--mui-palette-text-secondary, #888)" }}
        >
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search models..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "0.875rem",
            backgroundColor: "transparent",
            color: "inherit",
          }}
        />
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "var(--mui-palette-text-secondary, #888)",
            padding: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Model list */}
      <DialogContent sx={{ p: 0, py: "8px" }}>
        {providers.map((provider) => {
          const providerModels = filtered.filter((m) => m.provider === provider);
          if (providerModels.length === 0) return null;
          return (
            <div key={provider}>
              <div
                style={{
                  padding: "4px 14px",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "var(--mui-palette-text-secondary, #888)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {provider}
              </div>
              {providerModels.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onSelect(m.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "8px 14px",
                    border: "none",
                    background: m.id === selectedModelId ? "var(--mui-palette-action-selected, #f0f0f0)" : "none",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    color: "inherit",
                    gap: "10px",
                  }}
                >
                  <ModelIcon provider={provider} />
                  <span style={{ flex: 1, textAlign: "left" }}>{m.name}</span>
                  {m.id === selectedModelId && (
                    <svg
                      aria-hidden="true"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      style={{ color: "var(--mui-palette-text-secondary, #888)", flexShrink: 0 }}
                    >
                      <path
                        d="M2 7L5.5 10.5L12 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
