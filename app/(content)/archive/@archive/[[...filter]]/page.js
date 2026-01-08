import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import Link from "next/link";
import { Suspense } from "react";

async function FilterHeader({ year, month }) {
  const availableYears = await getAvailableNewsYears();

  // Validate year
  if (year && !availableYears.includes(year)) {
    throw new Error("Invalid year filter");
  }

  // Fetch months if year is selected
  const availableMonths = year ? await getAvailableNewsMonths(year) : [];

  // Normalize month to 2 digits
  const normalizedMonth = month ? month.padStart(2, "0") : undefined;

  // Validate month
  if (normalizedMonth && !availableMonths.includes(normalizedMonth)) {
    throw new Error("Invalid month filter");
  }

  // Determine links to show
  let links = [];
  if (!year) {
    links = availableYears;
  } else if (year && !month) {
    links = availableMonths;
  }

  if (links.length === 0) return null;

  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year
              ? `/archive/${year}/${link.padStart(2, "0")}`
              : `/archive/${link}`;

            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

async function FilterNews({ year, month }) {
  if (!year) {
    return <p>Please select a year to view news.</p>;
  }

  let news = [];

  if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  } else {
    news = await getNewsForYear(year);
  }

  if (!Array.isArray(news) || news.length === 0) {
    return <p>No News Found for the selected period.</p>;
  }

  return <NewsList news={news} />;
}

const ArchiveFilterPage = async ({ params }) => {
  const filter = params?.filter ?? [];
  const selectedYear = filter[0];
  const selectedMonth = filter[1];

  return (
    <>
      <Suspense fallback={<p>Loading Filtered Links...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>

      <Suspense fallback={<p>Loading Filtered News...</p>}>
        <FilterNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
};

export default ArchiveFilterPage;
