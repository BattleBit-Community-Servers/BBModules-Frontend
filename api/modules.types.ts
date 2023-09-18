// Interface for module data
type Users = {
    User_displayname: string;
    User_discord_id: string;
};

export type Versions = {
    Version_id: number;
    Version_v_number: string;
    Version_approved: boolean;
    Version_changelog: string;
    dependencies: Dependencies[];
};

export type Dependencies = {
    Dependency_type: string;
    Dependency_binary_text: string | null;
    module: ModuleData;
};

export type ModuleData = {
    Module_id: number;
    Module_name: string;
    Module_shortdesc: string;
    Module_markdown: string;
    Module_downloads: number;
    users: Users;
    versions: Versions[];
};

export type FilteredModuleList = {
    results: ModuleData[];
    count: number;
};
