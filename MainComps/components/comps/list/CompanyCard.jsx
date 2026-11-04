import Link from "next/link";
import MainText from "../MainTextComponent";

export default function CompanyCard({ record }) {
  return (
    <Link
      href={`/view?entity=companies&id=${record.id}`}
      className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-2xl">
        🏢
      </div>

      <MainText
        as="h2"
        className="mt-5 text-xl font-semibold text-slate-900 group-hover:text-blue-600"
      >
        {record.name}
      </MainText>

      <MainText as="p" className="mt-2 text-sm font-medium text-blue-600">
        {record.is_contracted ? "Contracted" : "Not Contracted"}
      </MainText>

      {record.description ? (
        <MainText as="p" className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {record.description}
        </MainText>
      ) : null}
    </Link>
  );
}
