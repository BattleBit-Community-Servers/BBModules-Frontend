import { createContext } from "react";
import { UserData } from "./user.types.js";

export const UserContext = createContext(null as UserData | null);
