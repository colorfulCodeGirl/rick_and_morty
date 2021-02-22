import React, { useState } from "react";
import {
  Character,
  useGetCharactersQuery,
} from "src/graphql/queries/getCharacters.generated";
import Loader from "../atoms/Loader";
import CharacterCard from "../atoms/CharacterCard";

const Characters: React.FC = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useGetCharactersQuery({
    variables: { page },
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Sorry, something went wrong, please try again later</p>;
  }

  const charactersList = data?.characters?.results as Character[];
  const maxPage = data?.characters?.info?.pages;

  const handleClick = (direction: string): void => {
    if (!maxPage) return;
    setPage((prev) => {
      const next = direction === "forward" ? prev + 1 : prev - 1;
      return next <= maxPage && next > 0 ? next : prev;
    });
  };

  return (
    <>
      <div className="grid grid-flow-col grid-cols-5 grid-rows-4 gap-4 m-3">
        {charactersList &&
          charactersList.map((char) => (
            <CharacterCard character={char} key={char.id} />
          ))}
      </div>
      <button
        onClick={() => handleClick("back")}
        className="p-1 m-3 bg-white border-2 rounded-md"
      >
        prev
      </button>
      <button
        onClick={() => handleClick("forward")}
        className="p-1 m-3 bg-white border-2 rounded-md"
      >
        next
      </button>
    </>
  );
};

export default Characters;
