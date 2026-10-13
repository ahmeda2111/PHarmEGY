import { getProductsQuery } from "./Products";
import { getCompaniesQuery } from "./companies";
import { getUsersQuery } from "./users";

export const queries = {
  Products: getProductsQuery,
  Companies: getCompaniesQuery,
  Users: getUsersQuery,
};