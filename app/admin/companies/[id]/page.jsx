import AdminCompanyFormScreen from "@/MainComps/components/Screens/Admin/AdminCompanyFormScreen";

export default async function EditCompanyPage({ params }) {
  const { id } = await params;
  return <AdminCompanyFormScreen companyId={id} />;
}
