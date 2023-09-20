import { FilteredModuleList, ModuleData } from "./modules.types";

export const apiUrl = "https://apirunner.mevng.net";

export async function getModules(
    page: number,
    search = "",
    filter = "",
    timeoutMs = 5000
): Promise<FilteredModuleList> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(
        `${apiUrl}/Modules/GetModules?page=${page}${
            search ? `&search=${encodeURIComponent(search)}` : ""
        }${
            filter ? `&filter=${encodeURIComponent(filter)}` : ""
        }`,
        { signal: controller.signal, credentials: "include" }
    );

    clearTimeout(timeout);
    if (!response.ok) {
        throw new Error(
            `Failed to fetch module: ${response.status} ${response.statusText}`
        );
    }

    const data = await response.json();
    return data;
}

export async function getModule(id: number): Promise<ModuleData> {
    const response = await fetch(`${apiUrl}/Modules/GetModule/${id}`, {
        credentials: "include",
    });
    const data = await response.json();
    return data;
}

export async function approveVersion(id: number): Promise<boolean> {
    const response = await fetch(`${apiUrl}/admin/Review`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, state: true }),
        credentials: "include",
    });
    return response.ok;
}

export async function denyVersion(id: number): Promise<boolean> {
    const response = await fetch(`${apiUrl}/admin/Review`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, state: false }),
        credentials: "include",
    });
    return response.ok;
}

export async function editMarkdown(id: number, markdown: string): Promise<boolean> {
    const response = await fetch(`${apiUrl}/Modules/EditModule`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, markdown: markdown }),
        credentials: "include",
    });
    return response.ok;
}
