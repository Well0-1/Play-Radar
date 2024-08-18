import SearchBar from "../assets/SearchBar";

export default function Main() {
  const GameCard = ({ href, imgSrc, companyName, gameName, date }) => (
    <a className="p-1" href={href}>
      <div className="h-full w-full flex border relative rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-400">
        <img className="object-cover w-full h-full" src={imgSrc} alt={gameName} />
        <div className="absolute w-full p-2 bg-gradient-to-b from-black to-transparent">
          <h1 className="font-medium text-white">{companyName}</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
          <div className="flex justify-between items-center">
            <h1 className="font-extrabold text-xl text-white">{gameName}</h1>
            <h1 className="text-lg text-gray-300">{date}</h1>
          </div>
        </div>
      </div>
    </a>
  );

  return (
    <div className="w-full h-full relative flex flex-col max-2xl:pb-4 2xl:p-[2%] bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="w-full flex lg:justify-between lg:p-4">
        <div className="flex items-center justify-center max-lg:hidden pl-5">
          <strong className="text-xl text-white">Popular Games</strong>
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
          companyName={"Rockstar Games"}
          gameName={"Mafia"}
          date={"2013"}
        />{" "}
        <GameCard
          href={"/games"}
          imgSrc={
            "https://www.oyun.news/wp-content/uploads/call-of-duty-modern-warfare-incelemesi-rehberi.jpg"
          }
          companyName={"Rockstar Games"}
          gameName={"Grand Theft Auto V"}
          date={"2013"}
        />{" "}
        <GameCard
          href={"/games"}
          imgSrc={
            "https://sm.ign.com/t/ign_tr/news/g/gta-6-rock/gta-6-rockstar-officially-unveils-first-trailer-early-after_d7ds.1280.jpg"
          }
          companyName={"Rockstar Games"}
          gameName={"Grand Theft Auto V"}
          date={"2013"}
        />{" "}
        <GameCard
          href={"/games"}
          imgSrc={
            "https://sm.ign.com/t/ign_tr/news/g/gta-6-rock/gta-6-rockstar-officially-unveils-first-trailer-early-after_d7ds.1280.jpg"
          }
          companyName={"Rockstar Games"}
          gameName={"Grand Theft Auto V"}
          date={"2013"}
        />{" "}
        <GameCard
          href={"/games"}
          imgSrc={
            "https://sm.ign.com/t/ign_tr/news/g/gta-6-rock/gta-6-rockstar-officially-unveils-first-trailer-early-after_d7ds.1280.jpg"
          }
          companyName={"Rockstar Games"}
          gameName={"Grand Theft Auto V"}
          date={"2013"}
        />
      </div>
    </div>
  );
}
