// src/utils/layoutUtils.ts
export const getLayoutTypeFromRoomId = (
  roomId: string
): "IMAX" | "LUX" | "INDULGE" | undefined => {
  const id = roomId.toLowerCase();
  if (id.includes("imax")) return "IMAX";
  if (id.includes("lux")) return "LUX";
  if (id.includes("indulge")) return "INDULGE";
  return undefined;
};
