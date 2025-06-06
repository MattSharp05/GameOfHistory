import styles from "./page.module.css";
import Header from "../components/Navbar/Header";
import CardWheel from "../components/CardWheel/CardWheel";

export default function Home() {
  const categoryCards = [
    { title: 'Picture', id: 'picture', description: 'Players must determine the year a historical photo was taken by analyzing visual clues within the image. Without direct hints, they rely on details like photo quality, objects, and setting to make their best guess. This mode rewards a keen eye and historical intuition, making every round a test of observation and deduction.' },
    { title: 'Famous People', id: 'famous-people' },
    { title: 'Cars', id: 'cars' },
    { title: 'Art', id: 'art' },
    { title: 'Buildings', id: 'buildings' }
  ];

  const globalCards = [
    { title: 'North America', id: 'north-america' },
    { title: 'Europe', id: 'europe' },
    { title: 'Asia', id: 'asia' },
    { title: 'Africa', id: 'africa' },
    { title: 'Australia', id: 'australia' }
  ];

  const adventureCards = [
    { title: 'Sorting', id: 'sorting' },
    { title: 'Before or After', id: 'before-or-after' },
    { title: 'Streets', id: 'streets' }
  ];

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <CardWheel cards={categoryCards} title="Classic" />
        <CardWheel cards={globalCards} title="Global" cardStyle="global" />
        <CardWheel cards={adventureCards} title="Adventure" />
      </main>
    </div>
  );
}
