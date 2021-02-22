import React from "react";
import {
  Character,
  useGetCharactersQuery,
} from "src/graphql/queries/getCharacters.generated";
import CharacterCard from "../molecules/CharacterCard";

const Characters: React.FC = (): JSX.Element => {
  const { data, loading, error } = useGetCharactersQuery({
    variables: { page: 2 },
  });

  if (loading || error) {
    return <p>wrong or not jet</p>;
  }

  const charactersList = data?.characters?.results as Character[];
  console.log(charactersList);

  return (
    <div>
      {charactersList &&
        charactersList.map((char) => (
          <CharacterCard character={char} key={char.id} />
        ))}
    </div>
  );
};

export default Characters;
