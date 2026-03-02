import { createContext } from "react";

export type UIContextProps = Record<string, unknown>;

const defaults: UIContextProps = {};

export const UIContext = createContext<UIContextProps>(defaults);
