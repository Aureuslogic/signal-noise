import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { MarketTape } from "@/components/MarketTape/MarketTape";
import { SignalOrNoiseGame } from "@/components/SignalOrNoiseGame/SignalOrNoiseGame";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrap}>
      <Header />
      <MarketTape />
      <SignalOrNoiseGame />
      <Footer />
    </div>
  );
}
