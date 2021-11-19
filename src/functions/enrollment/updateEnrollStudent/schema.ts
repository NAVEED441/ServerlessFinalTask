export default {
  type: "object",
  properties: {
    courseid: { type: "string" },
    studentid: { type: "string" },
    dateofassigment: { type: "number" },
  },
  required: ["courseid", "studentid", "dateofassigment"],
} as const;
