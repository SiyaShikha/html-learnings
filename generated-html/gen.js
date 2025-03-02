//attributes as obj
const createTag = (tagName, content, attributes = {}) => {
  const { style, ...otherAttributes } = attributes;

  const styleString = style
    ? ` style="${Object.entries(style)
        .map(([key, value]) => `${key}:${value}`)
        .join(";")}"`
    : "";

  const props = otherAttributes
    ? Object.entries(otherAttributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")
    : "";

  const combinedAttributes = (props + styleString).trim();

  const selfClosingTags = ["img", "br", "hr"];
  if (selfClosingTags.includes(tagName)) {
    return `<${tagName}${combinedAttributes} />`;
  }

  return `<${tagName}${
    combinedAttributes ? " " + combinedAttributes : ""
  }>${content}</${tagName}>`;
};

const getDoc = (body) => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>generated doc</title>
  </head>
  <body style="margin:0;padding:0">${body}</body>
</html>
`;
};

const main = () => {
  try {
    const colors = [
      "rgba(0,0,0,0.9)",
      "rgba(0,0,0,0.8)",
      "rgba(0,0,0,0.7)",
      "rgba(0,0,0,0.6)",
      "rgba(0,0,0,0.5)",
      "rgba(0,0,0,0.4)",
      "rgba(0,0,0,0.3)",
      "rgba(0,0,0,0.2)",
      "rgba(0,0,0,0.1)",
    ];

    const body = colors
      .map((color) =>
        createTag("div", "", {
          style: { "background-color": color, padding: "30px" },
        })
      )
      .join("");

    const doc = getDoc(body);
    Deno.writeTextFileSync("./cool.html", doc);
  } catch (error) {
    console.error("generation failed", error);
  }
};

main();
