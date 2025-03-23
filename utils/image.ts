import { slug } from "./slug";

export const getFileExtension = (uri: string) => uri.split(".").pop() || "jpg";

export function getFileName(uri: string, name: string, date: Date) {
  const extension = getFileExtension(uri);
  return `${slug(name)}_${new Date().getTime()}.${extension}`;
}
