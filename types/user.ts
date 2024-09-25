export const user = [
  {
    id: 1,
    name: "dashtail",
    image: "",
    password: "password",
    email: "dashtail@codeshaper.net",
    resetToken: null,
    resetTokenExpiry: null,
    profile: null,
  },
];

export type User = (typeof user)[number];
