export const queryActions = {
  filters: (query, value) =>
    Object.entries(value).reduce(
      (query, [field, fieldValue]) =>
        query.eq(field, fieldValue),
      query
    ),

  sort: (query, value) =>
    query.order(value.field, {
      ascending: value.direction !== "desc",
    }),

  pagination: (query, value) =>
    query.range(
      (value.page - 1) * value.limit,
      value.page * value.limit - 1
    ),
};