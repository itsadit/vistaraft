import Card from "../Card/Card";
import Hero from "../Hero/Hero";
import Manali from "../../assets/Manali.png";
import Shimla from "../../assets/Shimla.jpg";
import Kashmir from "../../assets/Kashmir.jpg";
import Kerela from "../../assets/Kerela.jpg";
import Mcleodganj from "../../assets/Mcleodganj.jpg";
import chardham from "../../assets/chardham.jpg";
import dalhousie from "../../assets/dalhousie.jpg";
import ChoptaChandrashila from "../../assets/ChoptaChandrashila.jpg";
import SubHero from "../../components/SubHero/SubHero";

function Home() {
  return (
    <div className="w-full overflow-hidden font-poppins bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <Hero />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 opacity-70"></div>
      </div>

      <br />
      <SubHero />
      <br />

      {/* Section Title */}
      <h1 className="text-center mb-8 text-4xl font-extrabold md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Explore The Best
        </span>{" "}
        <span className="text-green-400">Destinations</span>
      </h1>

      {/* Grid Container for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8 pb-12">
        <Card photo={Shimla} heading={"Shimla"} description={"❄️ Snow-capped mountains & scenic valleys"} />
        <Card photo={Kashmir} heading={"Kashmir"} description={"🏞️ Experience the paradise of India"} />
        <Card photo={Kerela} heading={"Kerela"} description={"🌿 Lush backwaters & exotic wildlife"} />
        <Card photo={Manali} heading={"Manali"} description={"🏔️ Adventure, trekking & snowy peaks"} />
        <Card photo={Mcleodganj} heading={"Mcleodganj"} description={"🛕 Spiritual vibes & mountain tranquility"} />
        <Card photo={chardham} heading={"Char Dham"} description={"🛤️ A divine pilgrimage journey"} />
        <Card photo={dalhousie} heading={"Dalhousie"} description={"🌲 A charming hill station escape"} />
        <Card photo={ChoptaChandrashila} heading={"Chopta Chandrashila"} description={"⛺ Stunning treks & serene beauty"} />
      </div>
    </div>
  );
}

export default Home;
