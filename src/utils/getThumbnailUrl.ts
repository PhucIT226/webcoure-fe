import type { Image, TAny } from "../types/common";
import type { Course } from "../types/course";

export const getThumbnailUrl = (
  course: Course | { image?: Image[] } | TAny
): string => {
  // 1️⃣ Ưu tiên: nếu có image[]
  if (Array.isArray(course.image) && course.image.length > 0) {
    return course.image[0]?.url || course.image[0];
  }

  // 2️⃣ Nếu có thumbnailUrls[]
  if (Array.isArray(course.thumbnailUrls) && course.thumbnailUrls.length > 0) {
    return course.thumbnailUrls[0]?.url || course.thumbnailUrls[0];
  }

  // 3️⃣ Nếu có thumbnailUrl đơn
  if (course.thumbnailUrl) return course.thumbnailUrl;

  // 4️⃣ Nếu có image đơn
  if (typeof course.image === "string") return course.image;

  // 5️⃣ Fallback ảnh mặc định
  return "/fallback.png";
};
