export default {
  type: "object",
  properties: {
    coursecode: { type: "string" },
    coursetitle: { type: "string" },
    CH: { type: "number" },
  },
  required: ["coursecode", "coursetitle", "CH"],
} as const;
