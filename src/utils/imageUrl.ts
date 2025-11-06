// src/utils/imageUrl.ts
export const getFullImageUrl = (path?: string) => {
  if (!path) return "/default-course.jpg";
  const BASE_URL = import.meta.env.VITE_BASE_API_URL || "";
  const cleanPath = path.replace(/^\//, "");
  return path.startsWith("http") ? path : `${BASE_URL}/${cleanPath}`;
};
