import { queryActions } from "./queryActions";

export const getUsersQuery = (supabase, params = {}) => {
  const query = supabase.from("Users").select("*");

  return Object.entries(params).reduce(
    (query, [key, value]) => queryActions[key](query, value),
    query
  );
};
