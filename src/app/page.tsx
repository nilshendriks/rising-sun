// import Image from "next/image";
import styles from "./page.module.css";
import LocationCard from "@/components/LocationCard";

export default function Home() {
  return (
    <main className={styles.main}>

      <div id="sun">
        <svg width="50vmin" height="50vmin" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25vmin" cy="25vmin" r="25vmin" ></circle>
        </svg>
      </div>

      <div className={styles.GridCards}>
        <LocationCard lat={35.69} lon={139.69} unit="C" />
        <LocationCard lat={52.37} lon={4.89} unit="C" />
      </div>
      <div id="fake-sun">
        <svg width="50vmin" height="50vmin" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25vmin" cy="25vmin" r="25vmin" fill="white"></circle>
        </svg>
      </div>
    </main>
  );
}
