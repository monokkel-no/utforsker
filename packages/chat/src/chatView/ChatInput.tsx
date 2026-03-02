import { Button } from "@repo/ui-components/button";
import { Fab } from "@repo/ui-components/fab";
import { ArrowUp, Icon } from "@repo/ui-components/icon";
import { TextField } from "@repo/ui-components/textField";
import { useState } from "react";
import { models, type ModelId } from "../models.js";
import { ModelPickerDialog } from "./ModelPickerDialog.js";
import { border, bottom } from "./chatView.css.js";

interface Props {
  onSend: (text: string) => void;
  selectedModelId: ModelId;
  onModelChange: (modelId: ModelId) => void;
}

export function ChatInput({ onSend, selectedModelId, onModelChange }: Props) {
  const [input, setInput] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleModelSelect = (modelId: ModelId) => {
    onModelChange(modelId);
    setIsPickerOpen(false);
  };

  const selectedModel = models.find((m) => m.id === selectedModelId);
  const canSend = input.trim().length > 0;

  return (
    <div style={{ padding: "12px 16px 16px" }}>
      <div className={border}>
        <TextField
          placeholder="Message"
          rows={2}
          value={input}
          multiline
          fullWidth
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          variant="outlined"
          slotProps={{
            input: {
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              },
            },
          }}
        />
        <div className={bottom}>
          <Button type="button" variant="outlined" size="small" color="secondary" onClick={() => setIsPickerOpen(true)}>
            {selectedModel?.name ?? selectedModelId}
          </Button>
          <Fab
            type="button"
            size="small"
            color="primary"
            aria-label="Send message"
            onClick={handleSend}
            disabled={!canSend}
          >
            <Icon icon={ArrowUp} />
          </Fab>
        </div>
      </div>
      <ModelPickerDialog
        open={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        selectedModelId={selectedModelId}
        onSelect={handleModelSelect}
      />
    </div>
  );
}
