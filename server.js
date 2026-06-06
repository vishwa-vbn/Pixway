require("dotenv").config();

const required = ["IMAGEKIT_PUBLIC_KEY", "IMAGEKIT_PRIVATE_KEY", "IMAGEKIT_URL_ENDPOINT"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`[FATAL] Missing required environment variables: ${missing.join(", ")}`);
  // On Vercel, don't exit — the function will fail naturally on first use
  if (!process.env.VERCEL) {
    process.exit(1);
  }
}

const app = require("./src/app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ UniUpload running on http://localhost:${PORT}`);
});

module.exports = app; // Required for Vercel serverless
