import BrandsSection from "../components/landingPage/BrandsSection";
import CardsSection from "../components/landingPage/CardsSection";
import HeroSection from "../components/landingPage/HeroSection";
import MetricsSection from "../components/landingPage/MetricsSection";
import SummarySection from "../components/landingPage/SummarySection";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Strona Główna</title>
      </Head>
      <HeroSection />
      <BrandsSection />
      <CardsSection />
      <MetricsSection />
      <SummarySection />
    </>
  );
}
