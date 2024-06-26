import React from 'react'
import genres from '../utilities/genres.js';
function WatchListTable({watchlist, setWatchlist, currGenre, removeFromWatchlist, searchVal}) {
    ;
    function sortDescending() {
        let sorted = watchlist.sort((a, b) => b.vote_average - a.vote_average);
        setWatchlist([...sorted]);
      }
      function sortAscending() {
        let sorted = watchlist.sort((a, b) => a.vote_average - b.vote_average);
        setWatchlist([...sorted]);
      }
      
  return (
    <div className="p-4 table-container">
        <table className="w-full">
          <thead className="bg-blue-100">
            <tr className="p-4 h-[3rem]">
              <th>Name</th>
              <th>
                <div className="flex items-center justify-center">
                  <div onClick={sortAscending} className="p-2">
                    <i className="fa-solid fa-arrow-down"></i>
                  </div>
                  <div className="px-2">Rating</div>
                  <div onClick={sortDescending} className="p-2">
                    <i className="fa-solid fa-arrow-up"></i>
                  </div>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {watchlist
              .filter((movie) => {
                if (currGenre != "All movies") {
                  return (
                    movie.title
                      .toLowerCase()
                      .includes(searchVal.toLocaleLowerCase()) &&
                    genres[movie.genre_ids[0]] == currGenre
                  );
                } else {
                  return movie.title
                    .toLowerCase()
                    .includes(searchVal.toLocaleLowerCase());
                }
              })
              .map((movie) => {
                return (
                  <tr className="text-center border-b-[3px]" key={movie.id}>
                    <td className="flex items-center ">
                      <img
                        className="w-[150px] p-2"
                        src={`https://images.tmdb.org/t/p/original/${movie.poster_path}`}
                      ></img>
                      <div className="mx-4 font-bold">{movie.title}</div>
                    </td>
                    <td>{movie.vote_average.toFixed(2)}</td>
                    <td>{movie.popularity}</td>
                    <td>{genres[movie.genre_ids[0]]}</td>
                    <td>
                      <button
                        className="border-[1px] border-red-500 rounded p-2 text-red-600 font-bold shadow-red-700 hover:shadow-xl transition duration-300"
                        onClick={()=>removeFromWatchlist(movie)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
  )
}

export default WatchListTable