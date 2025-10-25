import type { TAny } from "../types/common";
import type { Course } from "../types/course";

export const getThumbnailUrl = (course: Course | TAny): string => {
  if (Array.isArray(course.thumbnailUrls) && course.thumbnailUrls.length > 0) {
    return course.thumbnailUrls[0].url;
  }
  if (course.thumbnailUrl) return course.thumbnailUrl;
  return "/fallback.png";
};
