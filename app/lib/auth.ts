// lib/auth.ts

// untuk jsonwebtoken (Node.js)
export const JWT_SECRET_NODE = process.env.JWT_SECRET || "secret_gunawan_app";

// untuk jose (Edge / Middleware)
export const JWT_SECRET_EDGE = new TextEncoder().encode(
  process.env.JWT_SECRET || "secret_gunawan_app",
);
