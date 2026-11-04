import Link from "next/link";
import MainText from "../MainTextComponent";

export default function AdminLinkCard({ record }) {
  return (
    <Link
      href={record.href}
      className="rounded-3xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <MainText as="h2" className="text-2xl font-bold text-slate-900">
        {record.title}
      </MainText>
      <MainText as="p" className="mt-3 text-slate-600">
        {record.description}
      </MainText>
    </Link>
  );
}
