import Image from "next/image";
import styles from "./page.module.css";
import LocationCard from "@/components/LocationCard";

export default function Home() {
  return (
    <main className={styles.main}>
      
      <div id="sun">
        <svg width="50vmin" height="50vmin" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25vmin" cy="25vmin" r="25vmin" style={{ fill: 'var(--color-sun, red)' }}></circle>
        </svg>
      </div>

      {/* <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div> */}

      <div className={styles.GridCards}>
        <LocationCard
          location="Tokyo"
          unit="C"
        />
        <LocationCard
          location="Amsterdam, The Netherlands"
          unit="C"
        />
        {/*
        <LocationCard
          location={"Budapest"}
          unit={"C"}
        />
        <LocationCard
          location={"Sittard"}
          unit={"C"}
        />
        <LocationCard
          location={""}
          unit={"C"}
        /> */}
      </div>
      <div id="fake-sun">        
        <svg width="50vmin" height="50vmin" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25vmin" cy="25vmin" r="25vmin" fill="white"></circle>
        </svg>
      </div>
    </main>
  );
}
