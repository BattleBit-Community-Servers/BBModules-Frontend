import { FilteredModuleList, ModuleData } from "./modules.types";

const apiUrl = "https://apirunner.mevng.net";

export async function getModules(page: number, timeoutMs = 5000) : Promise<FilteredModuleList> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    
    const response = await fetch(`${apiUrl}/Modules/GetModules?page=${page}`,
        { signal: controller.signal });
    
    clearTimeout(timeout);
    if (!response.ok) {
        throw new Error(`Failed to fetch module: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

export async function getModule(id: number) : Promise<ModuleData> {
    const response = await fetch(`${apiUrl}/Modules/GetModule/${id}`);
    const data = await response.json();
    return data;
}