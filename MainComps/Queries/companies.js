
import { queryActions } from "./queryActions";

export const getCompaniesQuery = (supabase, params = {}) => {
  const query = supabase
    .from("Companies")
    .select("*");

  return Object.entries(params).reduce(
    (query, [key, value]) =>
      queryActions[key](query, value),
    query
  );
};

