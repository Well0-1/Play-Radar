import { normalizeModelName } from "./normalizeModelName";

export const getBenchmarkScore = (model, data) => {
  if (!model) return "N/A";

  const normalizedModel = normalizeModelName(model);

  const benchmark = data.find((b) => normalizeModelName(b.model) === normalizedModel);
  return benchmark ? benchmark.score : "N/A";
};
