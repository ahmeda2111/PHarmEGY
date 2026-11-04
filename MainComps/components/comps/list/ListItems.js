"use client";

import AdminCompanyRow from "./AdminCompanyRow";
import AdminLinkCard from "./AdminLinkCard";
import AdminProductRow from "./AdminProductRow";
import AdminUserRow from "./AdminUserRow";
import CompanyCard from "./CompanyCard";
import ProductCard from "./ProductCard";
import ReviewCard from "./ReviewCard";

export const listItems = {
  productCard: ProductCard,
  companyCard: CompanyCard,
  adminLink: AdminLinkCard,
  adminProduct: AdminProductRow,
  adminCompany: AdminCompanyRow,
  adminUser: AdminUserRow,
  reviewCard: ReviewCard,
};
