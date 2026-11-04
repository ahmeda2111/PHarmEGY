const textTags = {
  span: "span",
  p: "p",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  label: "label",
  li: "li",
  dt: "dt",
  dd: "dd",
  small: "small",
  strong: "strong",
};

export default function MainText({
  as = "span",
  className = "",
  children,
  k,
  dir,
  ...rest
}) {
  const Tag = textTags[as] || "span";

  return (
    <Tag
      {...rest}
      className={className}
      dir={dir || undefined}
      data-i18n={k || undefined}
    >
      {children}
    </Tag>
  );
}
