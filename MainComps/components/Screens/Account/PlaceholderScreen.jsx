export default function PlaceholderScreen({ title, description }) {
  return (
    <main className="flex-1 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="mt-3 max-w-xl text-slate-600">{description}</p>
      </div>
    </main>
  );
}
