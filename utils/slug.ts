export const slug = (text: string) => {
  // remove accents
  const from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to =
      "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (let i = 0, l = from.length; i < l; i++) {
    text = text.replace(RegExp(from[i], "gi"), to[i]);
  }

  text = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return text;
};
