"use client";

import MainText from "./MainTextComponent";
import { listItems } from "./list/ListItems";

const cardLayout = "grid gap-6 sm:grid-cols-2 lg:grid-cols-4";
const tableLayout = "overflow-x-auto rounded-3xl border border-slate-200 bg-white";

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function rowKey(record) {
  return record?.id || record?.href || record?.key;
}

export default function List({
  view = "cards",
  item,
  data = [],
  loading = false,
  empty = "Nothing found.",
  className = "",
  layoutClassName = "",
  skeletonClassName = "h-56",
  itemProps = {},
}) {
  const Item = listItems[item];
  const isTable = view === "table";
  const layout = layoutClassName || (isTable ? tableLayout : cardLayout);

  if (view !== "cards" && view !== "table") {
    return (
      <MainText as="p" className="text-sm text-red-700">
        Unknown list view "{view}".
      </MainText>
    );
  }

  if (!Item) {
    return (
      <MainText as="p" className="text-sm text-red-700">
        Unknown list item "{item}".
      </MainText>
    );
  }

  if (loading) {
    if (isTable) {
      return <div className={cx("h-40 animate-pulse rounded-3xl bg-white", className)} />;
    }

    return (
      <div className={cx(layout, className)}>
        {[1, 2, 3, 4].map((slot) => (
          <div key={slot} className={cx(skeletonClassName, "animate-pulse rounded-2xl bg-white")} />
        ))}
      </div>
    );
  }

  if (!data.length) {
    if (isTable) {
      return (
        <div className={cx(layout, className)}>
          <MainText as="p" className="p-8 text-slate-500">
            {empty}
          </MainText>
        </div>
      );
    }

    return (
      <div className={cx("rounded-2xl bg-white p-10 text-center", className)}>
        <MainText as="p" className="text-slate-500">
          {empty}
        </MainText>
      </div>
    );
  }

  if (isTable) {
    const columns = Item.columns || [];

    return (
      <div className={cx(layout, className)}>
        <table className="w-full text-left">
          <thead className="border-b border-slate-200 bg-slate-50 text-sm text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-4 font-medium">
                  <MainText>{column.label}</MainText>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((record) => (
              <Item key={rowKey(record)} record={record} {...itemProps} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={cx(layout, className)}>
      {data.map((record) => (
        <Item key={rowKey(record)} record={record} {...itemProps} />
      ))}
    </div>
  );
}
