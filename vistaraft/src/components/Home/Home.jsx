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
    <div className="w-full overflow-hidden">
      {/* Hero Section with Gradient Overlay */}
      <div className="relative w-full h-screen">
        <Hero />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 opacity-80"></div>
      </div>

      <br />
      <SubHero />
      <br />

      {/* Title Section */}
      <h1 className="text-center mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Trips you will
        </span>{" "}
        (Love)
      </h1>
      <br />

      {/* Card Grid Section with More Padding */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-12">
        <Card photo={Shimla}heading={"Shimla"}description={"Delhi to Shimla"} />
        <Card photo={Kashmir}heading={"Kashmir"}description={"Delhi to Kashmir"} />
        <Card photo={Kerela}heading={"Kerela"}description={"Kochi to Kerela"} />
        <Card photo={Manali}heading={"Manali"}description={"Delhi to Manali"} />
        <Card photo={Mcleodganj}heading={"Mcleodganj"}description={"Delhi to Mcleodganj"} />
        <Card photo={chardham}heading={"Char Dham"}description={"Delhi to Char Dham"} />
        <Card photo={dalhousie}heading={"Dalhousie"}description={"Delhi to Dalhousie"} />
        <Card photo={ChoptaChandrashila}heading={"Chopta Chandrashila"}description={"Delhi to Chandrashila"} />
      </div>

      <br />
    </div>
  );
}

export default Home;
