export const avatarColors = [
  "#1F2B45",
  "#C57A67",
  "#7c3aed",
  "#0891b2",
  "#059669",
  "#ea580c",
  "#dc2626",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
];

export const getInitials = (name: string): string => {
  const parts = name.trim().split(" ");
  return parts.length > 1
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0]?.[0]?.toUpperCase() || "";
};

export const getAvatarColor = (id: number): string => {
  return avatarColors[id % avatarColors.length];
};

export const getAvatarColorByName = (name: string): string => {
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarColors[hash % avatarColors.length];
};
