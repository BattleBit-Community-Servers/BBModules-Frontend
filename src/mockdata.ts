const mockModuleDetailData = {
  Module_id: 1,
  Module_name: "Goaty_jokes",
  Module_author_id: 1,
  Module_downloads: 0,
  Module_shortdesc: "How did the pig get to the hogspital? In a hambulance.",
  Module_markdown: "huge collection of jokes, because why not !?",
  Module_created_at: "2023-08-30T00:23:41.000Z",
  Module_updated_at: "2023-08-31T21:05:57.000Z",
  users: {
    User_displayname: "goat_609",
    User_discord_id: "167555761831018496",
  },
  versions: [{ Version_v_number: "0.1.3", Version_approved: false }, { Version_v_number: "0.1.0", Version_approved: true }],
  dependencies: [
    {
        Dependency_id: 1,
        Dependency_type: "required",
        Dependency_module_name: "Playershits",
        Dependency_binary_text: null
    },
    {
        Dependency_id: 2,
        Dependency_type: "optional",
        Dependency_module_name: "PlayerPermissions",
        Dependency_binary_text: null
    },
    {
        Dependency_id: 3,
        Dependency_type: "binary",
        Dependency_module_name: null,
        Dependency_binary_text: "Newtonsoft.Json <script type=\"text/javascript\">alert(\"lol\");</script> (Bin\\net6.0\\Newtonsoft.Json.dll from https://github.com/JamesNK/Newtonsoft.Json/releases/tag/13.0.3)"
    }
  ]
};

const mockModuleData = [
  {
    Module_id: 1,
    Module_name: "Goaty_jokes",
    Module_shortdesc: "How did the pig get to the hogspital? In a hambulance.",
    Module_downloads: 0,
    users: { User_displayname: "goat_609" },
    versions: [{ Version_v_number: "0.1.3" }],
  },
  {
    Module_id: 2,
    Module_name: "PlayerPermissions",
    Module_shortdesc:
      "This module stores player roles (Admin, Moderator, Vip, Special) to a config file and will load and apply previously assigned roles to players when they join.",
    Module_downloads: 0,
    users: { User_displayname: "goat_609" },
    versions: [{ Version_v_number: "1.0.2" }],
  },
  {
    Module_id: 3,
    Module_name: "Playershits",
    Module_shortdesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Module_downloads: 0,
    users: { User_displayname: "goat_609" },
    versions: [{ Version_v_number: "1.0.0" }],
  },
  {
    Module_id: 4,
    Module_name: "ServerCrasher",
    Module_shortdesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Module_downloads: 69,
    users: { User_displayname: "rainorigami" },
    versions: [{ Version_v_number: "6.9.6" }],
  },
  {
    Module_id: 5,
    Module_name: "zombies",
    Module_shortdesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Module_downloads: 0,
    users: { User_displayname: "dasischbims" },
    versions: [{ Version_v_number: "0.0.0" }],
  },
  {
    Module_id: 6,
    Module_name: "gungame",
    Module_shortdesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Module_downloads: 0,
    users: { User_displayname: "dasischbims" },
    versions: [{ Version_v_number: "6.6.7" }],
  },
  {
    Module_id: 7,
    Module_name: "ffs",
    Module_shortdesc: "for fuck's sake",
    Module_downloads: 0,
    users: { User_displayname: "goat_609" },
    versions: [{ Version_v_number: "4.3.2" }],
  },
];

const mockUserData = [
  {
    User_id: 1,
    User_roles: "admin",
    User_displayname: "Bims",
    User_email: "dasischbims@test.com",
    User_is_banned: false,
    User_is_locked: false,
    User_discord_id: "337296708117594113",
    User_discord_username: "dasischbims",
    User_discord_guilds: ["1144412624197529751"],
    User_discord_access_token: "test_ac",
    User_discord_refresh_token: "test_rf",
    User_discord_issued_token: "2021-08-28 12:00:00",
    User_created_at: "2021-08-28 12:00:00",
    User_updated_at: "2021-08-28 12:00:00",
    User_profile_picture:
      "https://cdn.discordapp.com/avatars/337296708117594113/0552ba8ca1673e398ffaf3e3f14f095d.webp?size=96",
    modules: [2, 4],
  },
  {
    User_id: 2,
    User_roles: "admin",
    User_displayname: "AgentSmith",
    User_email: "agentsmith@test.com",
    User_is_banned: false,
    User_is_locked: false,
    User_discord_id: "209443216775184385",
    User_discord_username: "AgentSmith",
    User_discord_guilds: ["1144412624197529751"],
    User_discord_access_token: "test_ac",
    User_discord_refresh_token: "test_rf",
    User_discord_issued_token: "2021-08-28 12:00:00",
    User_created_at: "2021-08-28 12:00:00",
    User_updated_at: "2021-08-28 12:00:00",
    User_profile_picture:
      "https://cdn.discordapp.com/avatars/209443216775184385/f46e232deb81c42b677a73f824ed8c2c.webp?size=96",
    modules: [1, 3],
  },
  {
    User_id: 3,
    User_roles: "moderator",
    User_displayname: "RainOrigami",
    User_email: "rain@test.com",
    User_is_banned: false,
    User_is_locked: false,
    User_discord_id: "601874132329693254",
    User_discord_username: "rainorigami",
    User_discord_guilds: ["1144412624197529751"],
    User_discord_access_token: "test_ac",
    User_discord_refresh_token: "test_rf",
    User_discord_issued_token: "2021-08-28 12:00:00",
    User_created_at: "2021-08-28 12:00:00",
    User_updated_at: "2021-08-28 12:00:00",
    User_profile_picture:
      "https://cdn.discordapp.com/avatars/601874132329693254/76271b7936c83397d32de6a84cb29d59.webp?size=96",
    modules: [5],
  },
  {
    User_id: 4,
    User_roles: "admin",
    User_displayname: "Goat",
    User_email: "goat@test.com",
    User_is_banned: false,
    User_is_locked: false,
    User_discord_id: "167555761831018496",
    User_discord_username: "goat",
    User_discord_guilds: ["1144412624197529751"],
    User_discord_access_token: "test_ac",
    User_discord_refresh_token: "test_rf",
    User_discord_issued_token: "2021-08-28 12:00:00",
    User_created_at: "2021-08-28 12:00:00",
    User_updated_at: "2021-08-28 12:00:00",
    User_profile_picture:
      "https://cdn.discordapp.com/avatars/167555761831018496/7a875927955663de61bdfb0d251a2a97.webp?size=96",
    modules: [1],
  },
];

export { mockModuleData, mockUserData, mockModuleDetailData };
