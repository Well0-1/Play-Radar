import SearchBar from "../assets/SearchBar";

export default function Main() {
  const GameCard = ({ href, imgSrc, companyName, gameName, date }) => (
    <a className="p-1" href={href}>
      <div className="h-full w-full flex border relative rounded-lg overflow-hidden bg-white">
        <img className="object-cover w-full h-full" src={imgSrc} alt="Workplace" />
        <div className="absolute w-full p-2 bg-gradient-to-b from-black to-transparent">
          <h1 className="font-medium">{companyName}</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent">
          <div className="flex justify-between p-2">
            <h1 className="font-extrabold text-xl">{gameName}</h1>
            <h1 className="text-xl">{date}</h1>
          </div>
        </div>
      </div>
    </a>
  );
  return (
    <div className="w-full h-full relative flex flex-col 2xl:p-[2%]">
      <SearchBar />
      <div className="grid place-items-center grid-cols-4 gap-2 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 text-white">
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
