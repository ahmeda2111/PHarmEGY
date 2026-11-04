export function sanitizeSearchTerm(value) {
  return String(value || "")
    .trim()
    .replace(/[%_,()]/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 80);
}

export const queryActions = {
  filters: (query, value) =>
    Object.entries(value).reduce(
      (query, [field, fieldValue]) =>
        query.eq(field, fieldValue),
      query
    ),

  search: (query, value) => {
    const term = sanitizeSearchTerm(value?.term);

    if (!term) return query;

    const columns = value.columns?.length ? value.columns : ["name"];
    const pattern = `%${term}%`;
    const clause = columns.map((column) => `${column}.ilike.${pattern}`).join(",");

    return query.or(clause);
  },

  sort: (query, value) =>
    query.order(value.field, {
      ascending: value.direction !== "desc",
    }),

  pagination: (query, value) =>
    query.range(
      (value.page - 1) * value.limit,
      value.page * value.limit - 1
    ),

  limit: (query, value) => query.limit(value),
};