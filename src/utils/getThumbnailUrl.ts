import type { Image, TAny } from "../types/common";
import type { Course } from "../types/course";
export const getThumbnailUrl = (
  course: Course | { image?: Image[] } | TAny
): string => {
  // Ưu tiên: nếu có image[] trong cart item
  if (Array.isArray(course.image) && course.image.length > 0) {
    return course.image[0].url;
  }

  // Nếu có thumbnailUrl đơn lẻ
  if (course.thumbnailUrl) return course.thumbnailUrl;

  // Fallback ảnh mặc định
  return "/fallback.png";
};
