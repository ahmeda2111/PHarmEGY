import Link from "next/link";
import MainText from "../MainTextComponent";

export default function ProductCard({
  record,
  showCompany = false,
  titleAs = "h3",
  typeClassName = "mt-2 text-sm font-medium text-blue-600",
}) {
  return (
    <Link
      href={`/products/${record.id}`}
      className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-2xl">
        💊
      </div>

      <MainText
        as={titleAs}
        className="mt-5 text-xl font-semibold text-slate-900 group-hover:text-blue-600"
      >
        {record.name}
      </MainText>

      {record.type ? (
        <MainText as="p" className={typeClassName}>
          {record.type}
        </MainText>
      ) : null}

      {record.description ? (
        <MainText as="p" className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {record.description}
        </MainText>
      ) : null}

      {showCompany && record.company?.name ? (
        <MainText as="p" className="mt-4 text-xs font-medium text-slate-500">
          {record.company.name}
        </MainText>
      ) : null}
    </Link>
  );
}
