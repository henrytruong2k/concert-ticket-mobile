export function formatVND(value: string | number): string {
  if (!value) return "";
  if (typeof value === "number") {
    return value.toLocaleString("vi-VN") + "đ";
  }

  const number = parseInt(value.replace(/\D/g, ""), 10);
  return number ? number.toLocaleString("vi-VN") : "";
}
