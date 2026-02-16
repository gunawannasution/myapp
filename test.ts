import bcrypt from "bcryptjs";

(async () => {
  const hash = "$2b$12$F9rJXO8sb5oBwOTReg/6aOBtjeFpQWYiFmDKMcuAJe5plO64MDieG";
  const result = await bcrypt.compare("admin123", hash);
  console.log("MATCH:", result);
})();
