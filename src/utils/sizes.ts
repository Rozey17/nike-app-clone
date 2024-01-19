export const getSizes = (category: string, sub_category: string): Size[] => {
  if (category === "shoes") {
    return shoeSizes;
  } else if (sub_category.includes("Chaussettes")) {
    return sockSizes;
  } else if (sub_category.includes("Casquette")) {
    return capSizes;
  } else if (sub_category.includes("Gants")) {
    return gloveSizes;
  } else if (sub_category.includes("Manchons")) {
    return sleevesSizes;
  } else return clothSizes;
};

export const shoeSizes = [
  { name: "EU 35.5", value: 35.5 },
  { name: "EU 36", value: 36 },
  { name: "EU 36.5", value: 36.5 },
  { name: "EU 37", value: 37 },
  { name: "EU 37.5", value: 37.5 },
  { name: "EU 38", value: 38 },
  { name: "EU 38.5", value: 38.5 },
  { name: "EU 39", value: 39 },
  { name: "EU 39.5", value: 39.5 },
  { name: "EU 40", value: 40 },
  { name: "EU 40.5", value: 40.5 },
  { name: "EU 41", value: 41 },
  { name: "EU 41.5", value: 41.5 },
  { name: "EU 42", value: 42 },
  { name: "EU 42.5", value: 42.5 },
  { name: "EU 43", value: 43 },
  { name: "EU 43.5", value: 43.5 },
  { name: "EU 44", value: 44 },
  { name: "EU 44.5", value: 44.5 },
  { name: "EU 45", value: 45 },
  { name: "EU 45.5", value: 45.5 },
  { name: "EU 46", value: 46 },
];
export const capSizes = [
  { name: "S/M", value: "S/M" },
  { name: "M/L", value: "M/L" },
  { name: "L/XL", value: "L/XL" },
];
export const gloveSizes = [
  { name: "S", value: "S" },
  { name: "M", value: "M" },
  { name: "L", value: "L" },
  { name: "XL", value: "XL" },
];
export const clothSizes = [
  { name: "XS", value: "XS" },
  { name: "S", value: "S" },
  { name: "M", value: "M" },
  { name: "L", value: "L" },
  { name: "XL", value: "XL" },
  { name: "XXL", value: "XXL" },
  { name: "XXXL", value: "XXXL" },
];
export const sockSizes = [
  { name: "EU 34-38", value: "34-38" },
  { name: "EU 38-42", value: "38-42" },
  { name: "EU 42-46", value: "42-46" },
  { name: "EU 46-50", value: "46-50" },
];
export const sleevesSizes = [
  { name: "S/M", value: "S/M" },
  { name: "L/XL", value: "L/XL" },
];
