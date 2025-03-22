const productDetailsFields = (data) => [
  { label: "Brand", value: data.brand || "TBD" },
  { label: "Model", value: data.model || "TBD" },
  { label: "Price", value: data.price || "TBD" },
  { label: "CPU", value: data.cpu || "TBD" },
  { label: "RAM", value: data.ram || "TBD" },
  { label: "OS", value: data.os || "TBD" },
  { label: "Display", value: data.displaySize || "TBD" },
  { label: "Battery", value: data.battery || "TBD" },
  { label: "Camera", value: data.primaryCamera || "TBD" },
  { label: "Selfie Camera", value: data.secondaryCmera || "TBD" },
  { label: "Size", value: data.displaySize || "TBD" },
  { label: "Weight", value: data.weight || "TBD" },
];

export default productDetailsFields;