import { normalizeModelName } from "./normalizeModelName";

export const getBenchmarkScore = (model, data) => {
  if (!model) return "N/A";

  const normalizedModel = normalizeModelName(model.toLowerCase());

  const benchmark = data.find((b) => normalizeModelName(b.model.toLowerCase()) === normalizedModel);
  return benchmark ? benchmark.score : "N/A";
};
