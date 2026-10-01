
import ViewScreen from "@/MainComps/components/Screens/ViewDetails/ViewScreen";

type ViewPageProps = {
  searchParams: Promise<{
    entity?: string;
    id?: string;
  }>;
};

export default async function ViewPage({
  searchParams,
}: ViewPageProps) {
  const params = await searchParams;

  const entity = params?.entity || "products";
  const id = params?.id;

  return <ViewScreen entity={entity} id={id} />;
}

