
import ViewListScreen from "@/MainComps/components/Screens/ViewList/ViewListScreen";

export default async function ViewListPage({ searchParams }) {
  const params = await searchParams;

  const entity = params?.entity || "products";
  const type = params?.type || null;
  const q = params?.q || null;

  return <ViewListScreen entity={entity} type={type} q={q} />;
}
