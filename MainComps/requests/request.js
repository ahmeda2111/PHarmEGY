
import { supabase } from "../lib/supabase";
import { queries } from "../queries/index";

export async function request(queryName, params = {}) {
  const query = queries[queryName];
  console.log(queries)
  console.log(queryName)

  if (!query) {
    throw new Error(`Query "${queryName}" not found`);
  }

  const { data, error } = await query(supabase, params);

  if (error) {
    throw new Error(`Query "${queryName}" failed: ${error.message}`);
  }

  return data;
}

