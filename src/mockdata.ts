const mockModuleData = [
    {
        Module_id: 1,
        Module_name: "Sample Module 1",
        Module_author_id: 2,
        Module_downloads: 50,
        Module_shortdesc: "This is a sample module 1.",
        Module_markdown: "## Sample Module 1\n\nThis is a sample module 1 content.",
        Module_created_at: "2023-08-28 12:00:00",
        Module_updated_at: "2023-08-28 12:00:00",
    },
    {
        Module_id: 2,
        Module_name: "Sample Module 2",
        Module_author_id: 1,
        Module_downloads: 75,
        Module_shortdesc: "This is a sample module 2.",
        Module_markdown: "## Sample Module 2\n\nThis is a sample module 2 content.",
        Module_created_at: "2023-08-29 10:30:00",
        Module_updated_at: "2023-08-29 10:30:00",
    },
    {
        Module_id: 3,
        Module_name: "Sample Module 3",
        Module_author_id: 2,
        Module_downloads: 30,
        Module_shortdesc: "This is a sample module 3.",
        Module_markdown: "## Sample Module 3\n\nThis is a sample module 3 content.",
        Module_created_at: "2023-08-30 14:45:00",
        Module_updated_at: "2023-08-30 14:45:00",
    },
    {
        Module_id: 4,
        Module_name: "Sample Module 4",
        Module_author_id: 1,
        Module_downloads: 20,
        Module_shortdesc: "This is a sample module 4.",
        Module_markdown: "## Sample Module 4\n\nThis is a sample module 4 content.",
        Module_created_at: "2023-08-31 08:20:00",
        Module_updated_at: "2023-08-31 08:20:00",
    },
    {
        Module_id: 5,
        Module_name: "Sample Module 5",
        Module_author_id: 3,
        Module_downloads: 90,
        Module_shortdesc: "This is a sample module 5.",
        Module_markdown: "## Sample Module 5\n\nThis is a sample module 5 content.",
        Module_created_at: "2023-09-01 16:10:00",
        Module_updated_at: "2023-09-01 16:10:00",
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
        User_discord_guilds: [
            "1144412624197529751"
        ],
        User_discord_access_token: "test_ac",
        User_discord_refresh_token: "test_rf",
        User_discord_issued_token: "2021-08-28 12:00:00",
        User_created_at: "2021-08-28 12:00:00",
        User_updated_at: "2021-08-28 12:00:00",
        User_profile_picture: "https://cdn.discordapp.com/avatars/337296708117594113/0552ba8ca1673e398ffaf3e3f14f095d.webp?size=96",
        modules: [
            2,
            4,
        ],
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
        User_discord_guilds: [
            "1144412624197529751"
        ],
        User_discord_access_token: "test_ac",
        User_discord_refresh_token: "test_rf",
        User_discord_issued_token: "2021-08-28 12:00:00",
        User_created_at: "2021-08-28 12:00:00",
        User_updated_at: "2021-08-28 12:00:00",
        User_profile_picture: "https://cdn.discordapp.com/avatars/209443216775184385/f46e232deb81c42b677a73f824ed8c2c.webp?size=96",
        modules: [
            1,
            3,
        ],
    },
    {
        User_id: 3,
        User_roles: "admin",
        User_displayname: "RainOrigami",
        User_email: "rain@test.com",
        User_is_banned: false,
        User_is_locked: false,
        User_discord_id: "601874132329693254",
        User_discord_username: "rainorigami",
        User_discord_guilds: [
            "1144412624197529751"
        ],
        User_discord_access_token: "test_ac",
        User_discord_refresh_token: "test_rf",
        User_discord_issued_token: "2021-08-28 12:00:00",
        User_created_at: "2021-08-28 12:00:00",
        User_updated_at: "2021-08-28 12:00:00",
        User_profile_picture: "https://cdn.discordapp.com/avatars/601874132329693254/76271b7936c83397d32de6a84cb29d59.webp?size=96",
        modules: [
            5,
        ],
    },
    {
        User_id: 4,
        User_roles: "admin",
        User_displayname: "Goat",
        User_email: "goat@test.com",
        User_is_banned: false,
        User_is_locked: false,
        User_discord_id: "337296708117594113",
        User_discord_username: "goat",
        User_discord_guilds: [
            "1144412624197529751"
        ],
        User_discord_access_token: "test_ac",
        User_discord_refresh_token: "test_rf",
        User_discord_issued_token: "2021-08-28 12:00:00",
        User_created_at: "2021-08-28 12:00:00",
        User_updated_at: "2021-08-28 12:00:00",
        User_profile_picture: "https://cdn.discordapp.com/avatars/167555761831018496/7a875927955663de61bdfb0d251a2a97.webp?size=96",
        modules: [
            1,
        ],
    }
];

export {mockModuleData, mockUserData};