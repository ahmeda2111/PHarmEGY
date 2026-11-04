
import { queryActions } from "./queryActions";

export const getProductsQuery = (supabase, params = {}) => {
  const query = supabase
    .from("Products")
    .select(`
      *,
      company:Companies(
        id,
        name,
        description,
        is_contracted
      )
    `);

  return Object.entries(params).reduce(
    (query, [key, value]) =>
      queryActions[key](query, value),
    query
  );
};

