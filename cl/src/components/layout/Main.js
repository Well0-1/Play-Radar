import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../utils/SearchBar";
import { Skeleton } from "@mui/material";

export default function Main() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const API = process.env.REACT_APP_API;
  const token = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${API}/api/games`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGames(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen relative flex flex-col max-2xl:pb-4 2xl:p-[2%] bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="w-full flex lg:justify-between lg:p-4">
          <div className="flex items-center justify-center max-lg:hidden pl-5">
            <Skeleton variant="rounded" width={"15rem"} height={"1.25rem"} />
          </div>
          <div className="flex items-center max-lg:w-full w-2/5 pb-4">
            <Skeleton variant="rounded" width={"100%"} height={"3.5rem"} />
          </div>
        </div>
        <div className="sm:grid place-items-center grid-cols-4 gap-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:gap-0 text-white">
          <Skeleton variant="rounded" width={"100%"} height={"15rem"} sx={{ marginY: "0.5rem" }} />
          <Skeleton variant="rounded" width={"100%"} height={"15rem"} sx={{ marginY: "0.5rem" }} />
          <Skeleton variant="rounded" width={"100%"} height={"15rem"} sx={{ marginY: "0.5rem" }} />
          <Skeleton variant="rounded" width={"100%"} height={"15rem"} sx={{ marginY: "0.5rem" }} />
          <Skeleton variant="rounded" width={"100%"} height={"15rem"} sx={{ marginY: "0.5rem" }} />
          <Skeleton variant="rounded" width={"100%"} height={"15rem"} sx={{ marginY: "0.5rem" }} />
          <Skeleton variant="rounded" width={"100%"} height={"15rem"} sx={{ marginY: "0.5rem" }} />
          <Skeleton variant="rounded" width={"100%"} height={"15rem"} sx={{ marginY: "0.5rem" }} />
        </div>
      </div>
    );
  }

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
            <h1 className="text-sm text-gray-400">{date.slice(0, 4)}</h1>
          </div>
        </div>
      </div>
    </a>
  );

  const filteredGames = games.filter((game) =>
    game.gameName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="w-full min-h-screen relative flex flex-col max-2xl:pb-4 2xl:p-[2%] bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="w-full flex lg:justify-between lg:p-4">
        <div className="flex items-center justify-center max-lg:hidden pl-5">
          <strong className="text-xl text-white font-cairo">Popular Games</strong>
        </div>
        <div className="flex items-center max-lg:w-full w-2/5">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <div className="sm:grid place-items-center grid-cols-4 gap-4 max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:gap-0 text-white">
        {/* {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <GameCard
              key={game._id}
              href={"/games/" + game._id}
              imgSrc={game.imgUrl}
              companyName={game.company}
              gameName={game.gameName}
              date={game.releaseDate}
            />
          ))
        ) : (
          <GameCard
            href={"/customGame"}
            imgSrc={"https://images2.alphacoders.com/436/436580.jpg"}
            companyName={"Can't find your game?"}
            gameName={"No worries! Click here to create your own game profile."}
            date={"2024"}
          />
        )} */}
        <GameCard
          href={"/customGame"}
          imgSrc={
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/capsule_616x353.jpg?t=1724238313"
          }
          companyName={"Activision"}
          gameName={"Game Name"}
          date={"2000"}
        />
      </div>
    </div>
  );
}
