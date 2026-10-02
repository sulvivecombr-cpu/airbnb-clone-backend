export default [
  {
    context: ["/api", "/oauth2", "/login", "/assets"],
    target: "http://backend:8080",
    secure: false,
  },
];
