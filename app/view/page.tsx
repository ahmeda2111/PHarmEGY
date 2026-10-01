import ViewScreen from "@/MainComps/components/Screens/ViewDetails/ViewScreen";
export default async function ViewPage({ searchParams }) {
  const params = await searchParams;
  const entity = params?.entity || "products";
  const id = params?.id;
  return <ViewScreen entity={entity} id={id} />;
}
