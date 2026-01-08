import dotenvFlow from "dotenv-flow";
import { neon } from "@neondatabase/serverless";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
dotenvFlow.config();

// Neon SQL client
const sql = neon(process.env.DATABASE_URL);

// Dummy news data
const DUMMY_NEWS = [
  {
    slug: "will-ai-replace-humans",
    title: "Will AI Replace Humans?",
    image: "ai-robot.jpg",
    date: "2021-07-01",
    content:
      "Since late 2022 AI is on the rise and therefore many people worry whether AI will replace humans. The answer is not that simple...",
  },
  {
    slug: "beaver-plague",
    title: "A Plague of Beavers",
    image: "beaver.jpg",
    date: "2022-05-01",
    content:
      "Beavers are taking over the world. They are building dams everywhere...",
  },
  {
    slug: "couple-cooking",
    title: "Spend more time together!",
    image: "couple-cooking.jpg",
    date: "2024-03-01",
    content:
      "Cooking together is a great way to spend more time with your partner...",
  },
  {
    slug: "hiking",
    title: "Hiking is the best!",
    image: "hiking.jpg",
    date: "2024-01-01",
    content:
      "Hiking is a great way to get some exercise and enjoy the great outdoors...",
  },
  {
    slug: "landscape",
    title: "The beauty of landscape",
    image: "landscape.jpg",
    date: "2022-07-01",
    content:
      "Landscape photography is a great way to capture the beauty of nature...",
  },
];

async function initDB() {
  // 1️⃣ Create table
  await sql`
    CREATE TABLE IF NOT EXISTS news (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      date DATE NOT NULL,
      image TEXT NOT NULL
    );
  `;

  // 2️⃣ Seed data
  for (const news of DUMMY_NEWS) {
    await sql`
      INSERT INTO news (
        slug,
        title,
        content,
        date,
        image
      ) VALUES (
        ${news.slug},
        ${news.title},
        ${news.content},
        ${news.date},
        ${news.image}
      )
      ON CONFLICT (slug) DO NOTHING;
    `;
  }

  console.log("✅ News table initialized");
}

// Run script
initDB()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ DB init failed:", err);
    process.exit(1);
  });
