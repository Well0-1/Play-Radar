import SearchBar from "../utils/SearchBar";

export default function Main() {
  const GameCard = ({ href, imgSrc, companyName, gameName, date }) => (
    <a className="p-1" href={href}>
      <div className="h-full w-full flex border border-gray-700 relative rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-600">
        <div className="w-full h-full lg:aspect-video aspect-square">
          <img className="object-cover object-center w-full h-full" src={imgSrc} alt={gameName} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transp  arent">
          <h2 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
            {companyName}
          </h2>
          <div className="flex justify-between items-center mt-1">
            <h1 className="text-lg font-bold text-white font-cairo">{gameName}</h1>
            <h1 className="text-sm text-gray-400">{date}</h1>
          </div>
        </div>
      </div>
    </a>
  );

  return (
    <div className="w-full min-h-screen relative flex flex-col max-2xl:pb-4 2xl:p-[2%] bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="w-full flex lg:justify-between lg:p-4">
        <div className="flex items-center justify-center max-lg:hidden pl-5">
          <strong className="text-xl text-white font-cairo">Popular Games</strong>
        </div>
        <div className="flex items-center max-lg:w-full w-2/5">
          <SearchBar />
        </div>
      </div>
      <div className="sm:grid place-items-center grid-cols-4 gap-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:gap-0 text-white">
        <GameCard
          href={"/games"}
          imgSrc={
            "https://cdn1.epicgames.com/ee8802651a004c48999169fa32eb4903/offer/EGS_MafiaDefinitiveEditionPreOrder_Hangar13_G1A_00-1920x1080-268b01e611aa17de8caedd662b8462ab.jpg"
          }
          companyName={"Hangar 13"}
          gameName={"Mafia"}
          date={"2020"}
        />{" "}
        <GameCard
          href={"/games"}
          imgSrc={
            "https://www.oyun.news/wp-content/uploads/call-of-duty-modern-warfare-incelemesi-rehberi.jpg"
          }
          companyName={"Infinity Ward"}
          gameName={"Call Of Duty Modern Warfare"}
          date={"2019"}
        />{" "}
        <GameCard
          href={"/games"}
          imgSrc={
            "https://sm.ign.com/t/ign_tr/news/g/gta-6-rock/gta-6-rockstar-officially-unveils-first-trailer-early-after_d7ds.1280.jpg"
          }
          companyName={"Rockstar Games"}
          gameName={"Grand Theft Auto VI"}
          date={"2025"}
        />{" "}
        <GameCard
          href={"/games"}
          imgSrc={
            "https://startamomblog.com/wp-content/uploads/2019/05/iso-republic-scenic-mountain-landscape-reflection.jpg"
          }
          companyName={"Rockstar Games"}
          gameName={"Grand Theft Auto VI"}
          date={"2025"}
        />{" "}
        <GameCard
          href={"/games"}
          imgSrc={
            "https://www.cnet.com/a/img/resize/43bf7152f39f90a03df23c97a8a7ebb9a09ea520/hub/2022/02/23/f12a8db7-d99b-4b8d-9b09-d84f12661cf7/elden-ring-plakat.jpg?auto=webp&fit=bounds&height=1200&precrop=571,571,x357,y149&width=1200"
          }
          companyName={"Rockstar Games"}
          gameName={"Grand Theft Auto VI"}
          date={"2025"}
        />{" "}
        <GameCard
          href={"/CustomGame"}
          imgSrc={"https://images2.alphacoders.com/436/436580.jpg"}
          companyName={"You Couldnt find the game you looking for ? "}
          gameName={"No Problem! Click Here"}
          date={"Custom"}
        />
      </div>
    </div>
  );
}
