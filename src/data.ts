export const TOOLS = {
  blocks: {
    name: 'BloxdBlocks',
    tagline: 'Visual world-code builder',
    url: 'https://christynege4-creator.github.io/bloxdblocks2/bloxdcodetool.html',
    home: 'https://christynege4-creator.github.io/bloxdblocks2/',
    docs: 'https://christynege4-creator.github.io/bloxdblocks2/docs/docs.html',
    download: 'https://christynege4-creator.github.io/bloxdblocks2/download.html',
  },
  builder: {
    name: 'BloxdBuilder',
    tagline: 'World construction studio',
    url: 'https://christynege4-creator.github.io/',
  },
  bloxd: {
    name: 'Bloxd.io',
    url: 'https://bloxd.io',
  },
} as const;

export type LogicNode = {
  id: string;
  category: 'EVENT' | 'ACTION' | 'CONTROL' | 'VALUE';
  name: string;
  detail: string;
  snippet: string;
};

export const LOGIC_NODES: LogicNode[] = [
  {
    id: 'on-join',
    category: 'EVENT',
    name: 'On Player Join',
    detail: 'Fires once for every player entering the world.',
    snippet: 'onPlayerJoin = (playerId) => {\n  api.sendMessage(playerId, "Welcome!");\n};',
  },
  {
    id: 'on-tick',
    category: 'EVENT',
    name: 'On Tick',
    detail: 'Runs on every server tick — keep the body cheap.',
    snippet: 'onTick = (time) => {\n  // runs every server tick\n};',
  },
  {
    id: 'send-message',
    category: 'ACTION',
    name: 'Send Message',
    detail: 'Push one chat line to a single player.',
    snippet: 'api.sendMessage(playerId, "Your message");',
  },
  {
    id: 'give-item',
    category: 'ACTION',
    name: 'Give Item',
    detail: 'Add an item stack to a player inventory.',
    snippet: 'api.giveItem(playerId, "itemId", 1);',
  },
  {
    id: 'set-block',
    category: 'ACTION',
    name: 'Set Block',
    detail: 'Write a single block into world coordinates.',
    snippet: 'api.setBlock(x, y, z, "blockId");',
  },
  {
    id: 'if-alive',
    category: 'CONTROL',
    name: 'If Alive',
    detail: 'Guard a branch behind a liveness check.',
    snippet: 'if (api.isAlive(playerId)) {\n  // do something\n}',
  },
  {
    id: 'random-int',
    category: 'VALUE',
    name: 'Random Int',
    detail: 'Roll an integer inside an inclusive range.',
    snippet: 'api.randomInt(1, 10)',
  },
];

export type TerminalCommand = {
  id: string;
  name: string;
  signature: string;
  note: string;
};

export const TERMINAL_COMMANDS: TerminalCommand[] = [
  {
    id: 'sendMessage',
    name: 'api.sendMessage',
    signature: 'api.sendMessage(playerId, message)',
    note: 'Send a chat line to one player.',
  },
  {
    id: 'broadcast',
    name: 'api.broadcast',
    signature: 'api.broadcast(message)',
    note: 'Send a chat line to every player online.',
  },
  {
    id: 'setBlock',
    name: 'api.setBlock',
    signature: 'api.setBlock(x, y, z, blockId)',
    note: 'Write a single block into the world.',
  },
  {
    id: 'giveItem',
    name: 'api.giveItem',
    signature: 'api.giveItem(playerId, itemId, count)',
    note: 'Add an item stack to an inventory.',
  },
  {
    id: 'getPosition',
    name: 'api.getPosition',
    signature: 'api.getPosition(playerId)',
    note: 'Read a player world position.',
  },
  {
    id: 'isAlive',
    name: 'api.isAlive',
    signature: 'api.isAlive(playerId)',
    note: 'Boolean check for condition blocks.',
  },
];

export type ResourceType = 'logic' | 'structure' | 'asset' | 'core';

export type Resource = {
  id: string;
  name: string;
  kind: string;
  type: ResourceType;
  source: string;
  url: string;
  note: string;
  tags: string;
};

export const RESOURCES: Resource[] = [
  {
    id: 'bloxdblocks-editor',
    name: 'BloxdBlocks Editor',
    kind: 'Visual code builder',
    type: 'logic',
    source: 'GitHub Pages',
    url: TOOLS.blocks.url,
    note: 'Wire events, game APIs and logic blocks, then copy the generated JavaScript.',
    tags: 'editor logic javascript scripting workspace',
  },
  {
    id: 'bloxdblocks-docs',
    name: 'BloxdBlocks Docs',
    kind: 'Reference manual',
    type: 'logic',
    source: 'GitHub Pages',
    url: TOOLS.blocks.docs,
    note: 'Every block, event and API method documented inside the tool.',
    tags: 'docs reference api events methods',
  },
  {
    id: 'bloxdblocks-download',
    name: 'BloxdBlocks Download',
    kind: 'Offline build',
    type: 'logic',
    source: 'GitHub Pages',
    url: TOOLS.blocks.download,
    note: 'Take the builder offline and keep workspaces on your own machine.',
    tags: 'download offline workspace file',
  },
  {
    id: 'bloxdblocks-home',
    name: 'BloxdBlocks',
    kind: 'Product home',
    type: 'logic',
    source: 'GitHub Pages',
    url: TOOLS.blocks.home,
    note: 'The landing page for the visual world-code builder.',
    tags: 'home landing product bloxdblocks',
  },
  {
    id: 'bloxdbuilder',
    name: 'BloxdBuilder',
    kind: 'World construction studio',
    type: 'structure',
    source: 'GitHub Pages',
    url: TOOLS.builder.url,
    note: 'Lay out terrain, structures and props for Bloxd.io worlds.',
    tags: 'builder structure terrain voxel world studio',
  },
  {
    id: 'plinth-workspace',
    name: "Architect's Plinth",
    kind: 'BloxdBase workspace',
    type: 'structure',
    source: 'BloxdBase',
    url: '/plinth',
    note: 'Layer stack, blueprint/render modes and a validated deploy hand-off.',
    tags: 'plinth workspace layers blueprint render deploy',
  },
  {
    id: 'texture-packs',
    name: 'Texture Pack Library',
    kind: 'Reskins & visual styles',
    type: 'asset',
    source: 'BloxdBase Library',
    url: 'https://bloxdbase.base44.app/texture-packs',
    note: 'Community texture packs for every block face in your world.',
    tags: 'texture pack asset reskin visual',
  },
  {
    id: 'mods',
    name: 'Mod Library',
    kind: 'Gameplay modifications',
    type: 'asset',
    source: 'BloxdBase Library',
    url: 'https://bloxdbase.base44.app/mods',
    note: 'Drop-in gameplay mods built by the community.',
    tags: 'mod asset gameplay plugin',
  },
  {
    id: 'schematics',
    name: 'Schematic Library',
    kind: 'Build templates',
    type: 'asset',
    source: 'BloxdBase Library',
    url: 'https://bloxdbase.base44.app/schematics',
    note: 'Ready-made structures to paste into a fresh world.',
    tags: 'schematic asset build template structure',
  },
  {
    id: 'bloxd-io',
    name: 'Bloxd.io',
    kind: 'The game',
    type: 'core',
    source: 'bloxd.io',
    url: TOOLS.bloxd.url,
    note: 'The voxel platform both engines build for.',
    tags: 'bloxd game platform core',
  },
  {
    id: 'creator-github',
    name: 'Creator GitHub',
    kind: 'Source repositories',
    type: 'core',
    source: 'github.com',
    url: 'https://github.com/christynege4-creator',
    note: 'Source for BloxdBlocks, BloxdBuilder and every deployment.',
    tags: 'github source code repository core',
  },
  {
    id: 'discord',
    name: 'Community Discord',
    kind: 'Creator channel',
    type: 'core',
    source: 'discord.gg',
    url: 'https://discord.gg/S4mRRsERD',
    note: 'Share builds, request nodes and ship alongside other creators.',
    tags: 'discord community chat core',
  },
];

export type FeaturedDrop = {
  id: string;
  name: string;
  kind: string;
  copy: string;
  author: string;
  saves: string;
  accent: 'teal' | 'orange' | 'ghost';
  url: string;
};

export const FEATURED_DROPS: FeaturedDrop[] = [
  {
    id: 'gravity-shift',
    name: 'Gravity Shift Mod',
    kind: 'Mod',
    copy: 'Toggle gravity on command and float through your builds.',
    author: 'Newton',
    saves: '2,101 saves',
    accent: 'teal',
    url: 'https://bloxdbase.base44.app/mods',
  },
  {
    id: 'spawn-castle',
    name: 'Spawn Castle',
    kind: 'Schematic',
    copy: 'A ready-to-use medieval castle schematic for spawn areas.',
    author: 'ArchBuilder',
    saves: '1,500 saves',
    accent: 'orange',
    url: 'https://bloxdbase.base44.app/schematics',
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber Pack',
    kind: 'Texture Pack',
    copy: 'A glowing neon reskin with cyberpunk vibes for your world.',
    author: 'PixelMage',
    saves: '1,244 saves',
    accent: 'ghost',
    url: 'https://bloxdbase.base44.app/texture-packs',
  },
];

export const CATEGORIES = [
  { name: 'Texture Packs', note: 'Reskins & visual styles', count: '38', type: 'asset' },
  { name: 'Mods', note: 'Gameplay modifications', count: '24', type: 'logic' },
  { name: 'Schematics', note: 'Build templates & structures', count: '61', type: 'structure' },
  { name: 'World Tools', note: 'Editors & script engines', count: '09', type: 'logic' },
] as const;

export const LAYERS = [
  { id: 'terrain', name: 'Terrain', note: 'base plate' },
  { id: 'structures', name: 'Structures', note: 'build volumes' },
  { id: 'props', name: 'Props', note: 'scatter' },
  { id: 'lighting', name: 'Lighting', note: 'emissive pass' },
  { id: 'scripts', name: 'Scripts', note: 'bloxdblocks link' },
] as const;

export const HERO_STATS = [
  { label: 'Builds created', value: 128400 },
  { label: 'Blocks scripted', value: 4812000 },
  { label: 'Creators online', value: 1204 },
  { label: 'Nodes wired', value: 96300 },
];
