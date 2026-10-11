import AdminProductFormScreen from "@/MainComps/components/Screens/Admin/AdminProductFormScreen";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  return <AdminProductFormScreen productId={id} />;
}
