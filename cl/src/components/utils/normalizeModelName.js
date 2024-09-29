export const normalizeModelName = (model) => {
  if (!model) return "";

  model = model.toLowerCase();

  if (model.includes("intel")) {
    return model
      .replace(
        /^(12th gen|13th gen|14th gen|11th gen|10th gen|9th gen|8th gen|7th gen|6th gen|5th gen|4th gen|3rd gen|2nd gen|1st gen) /,
        ""
      )
      .replace(/\(r\)|\(tm\)|graphics|@/g, "")
      .trim()
      .replace(/\s+/g, " ");
  } else if (model.includes("amd")) {
    return model
      .replace(/\(r\)|\(tm\)|graphics|@/g, "")
      .trim()
      .replace(/\s+/g, " ");
  } else {
    return model
      .replace(/\(r\)|\(tm\)|graphics|nvidia/g, "")
      .trim()
      .replace(/\s+/g, " ");
  }
};
