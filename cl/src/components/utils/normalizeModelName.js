export const normalizeModelName = (model) => {
  if (!model) return "";

  if (model.includes("Intel")) {
    return model
      .replace(
        /^(12th Gen|13th Gen|14th Gen|11th Gen|10th Gen|9th Gen|8th Gen|7th Gen|6th Gen|5th Gen|4th Gen|3rd Gen|2nd Gen|1st Gen) /,
        ""
      )
      .replace(/\(R\)|\(TM\)/g, "")
      .replace(/Graphics/g, "")
      .trim()
      .replace(/\s+/g, " ");
  } else if (model.includes("AMD")) {
    return model
      .replace(/\(R\)|\(TM\)/g, "")
      .replace(/Graphics/g, "")
      .trim()
      .replace(/\s+/g, " ");
  } else {
    return model
      .replace(/\(R\)|\(TM\)/g, "")
      .replace(/Graphics/g, "")
      .trim()
      .replace(/\s+/g, " ");
  }
};
