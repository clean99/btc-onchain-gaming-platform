import { createContext } from "react";

export const AddressContext = createContext<[string, string] | null>(null);
