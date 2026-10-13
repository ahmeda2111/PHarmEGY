import ViewScreen from "@/MainComps/components/Screens/ViewDetails/ViewScreen";

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  return <ViewScreen entity="products" id={id} />;
}
