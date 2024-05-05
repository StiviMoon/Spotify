import { useState, useEffect } from "react";
import Loader from "../Components/Loader.jsx";
import { FaMusic } from "react-icons/fa6";

const Albums = () => {
  const [cancion, setCancion] = useState("");
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    if (cancion.trim() === "") {
      alert("Debes ingresar algo en el buscador");
      return;
    }
    setCancion("");
    setLoading(true);
    localStorage.setItem("searchTerm", cancion);
    getCancion(cancion);
  }

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d6db1e1849msh7fe8703c8bfa38fp162542jsn1d61c7b85001",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  async function getCancion(cancion) {
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=multi&offset=0&limit=20&numberOfTopResults=5`;
      let data = await fetch(url, options);
      let res = await data.json();
      setCanciones(res.tracks.items);
      console.log(res.tracks.items);
      setShowData(true);
    } catch (error) {
      console.log(`Ocurrio un error ${error}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const searchTerm = localStorage.getItem("searchTerm");
    if (searchTerm) {
      setLoading(true);
      getCancion(searchTerm);
    }
  }, []);

  // Función para truncar el texto si excede una longitud determinada
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between p-5">
        <div className="flex items-center mb-3 md:mb-0">
          <FaMusic className="text-3xl md:text-4xl text-[#009b49]" />
        </div>
        <div className="w-full md:w-[50%]">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row">
            <input
              className="w-full md:w-[65%] h-[30px] text-center m-1 md:m-4 rounded-xl"
              type="text"
              placeholder="Search"
              value={cancion}
              onChange={(e) => setCancion(e.target.value)}
            />
            <button className="w-full md:w-[150px] bg-black h-10 md:h-[45px] mt-2 md:mt-0 ml-0 md:ml-4 rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
              Buscar
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {loading ? (
          <Loader />
        ) : (
          showData &&
          canciones.map((cancion, index) => (
            <div
              key={index}
              className={`m-4 transition-opacity duration-500 transform hover:scale-105 hover:cursor-pointer bg. p-3 ${
                showData ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={cancion.data.albumOfTrack.coverArt.sources[0].url}
                alt=""
              />
              {/* Aplicar la función truncateText para limitar el número de caracteres */}
              <h2 className="text-center py-4">
                {truncateText(cancion.data.name, 20)}{" "}
                {/* Máximo 20 caracteres */}
              </h2>
              <a
                className="flex flex-wrap justify-center"
                href={cancion.data.uri}
              >
                <button>Play</button>
              </a>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Albums;
