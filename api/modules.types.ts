// Interface for module data
type Users = {
  User_displayname: string;
  User_discord_id: string;
};

type Versions = {
  Version_v_number: string;
  Version_approved: boolean;
};

type Dependencies = {
  Dependency_id: number;
  Dependency_version_id: number;
  Dependency_name: string;
  Dependency_module_version_id: number;
  Dependency_type: string;
  Dependency_text: string | null; 
};

export type ModuleData = {
  Module_id: number;
  Module_name: string;
  Module_shortdesc: string;
  Module_markdown: string;
  Module_downloads: number;
  dependencies: Dependencies[];
  users: Users;
  versions: Versions[];
};