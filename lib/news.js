import sql from "@/lib/db";

// artificial delay (to match your existing behavior)
const delay = () => new Promise((resolve) => setTimeout(resolve, 2000));

export async function getAllNews() {
  await delay();

  const news = await sql`
    SELECT * FROM news
    ORDER BY date DESC
  `;

  return news;
}

export async function getNewsItem(slug) {
  const [newsItem] = await sql`
    SELECT * FROM news
    WHERE slug = ${slug}
  `;

  if (!newsItem) {
    return null;
  }

  await delay();
  return newsItem;
}

export async function getLatestNews() {
  await delay();

  const latestNews = await sql`
    SELECT * FROM news
    ORDER BY date DESC
    LIMIT 3
  `;

  return latestNews;
}

export async function getAvailableNewsYears() {
  await delay();

  const years = await sql`
    SELECT DISTINCT EXTRACT(YEAR FROM date) AS year
    FROM news
    ORDER BY year DESC
  `;

  return years.map((y) => String(y.year));
}

export async function getAvailableNewsMonths(year) {
  const months = await sql`
    SELECT DISTINCT EXTRACT(MONTH FROM date) AS month
    FROM news
    WHERE EXTRACT(YEAR FROM date) = ${year}
    ORDER BY month ASC
  `;

  // return "01", "02", ...
  return months.map((m) => String(m.month).padStart(2, "0"));
}

export async function getNewsForYear(year) {
  await delay();

  const news = await sql`
    SELECT * FROM news
    WHERE EXTRACT(YEAR FROM date) = ${year}
    ORDER BY date DESC
  `;

  return news;
}

export async function getNewsForYearAndMonth(year, month) {
  await delay();

  const news = await sql`
    SELECT * FROM news
    WHERE
      EXTRACT(YEAR FROM date) = ${year}
      AND EXTRACT(MONTH FROM date) = ${month}
    ORDER BY date DESC
  `;

  return news;
}