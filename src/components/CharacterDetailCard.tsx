import {useParams} from "react-router";
import {Character} from "../types/RickAndMortyCharacter.ts";

type CharacterDetailCardProps = {
    characters: Character[]
}

export default function CharacterDetailCard({characters}: CharacterDetailCardProps)
{
    const params = useParams();
    const id: string | undefined = params.id;

    const character = characters.find((character) => character.id === Number(id))

    if (!character) {
        return <p>Character not found!</p>
    }

    return (
        <div className="character-detail-card">
            <img src={character.image} alt={character.name} />
            <div className="character-info">
                <h1>{character.name}</h1>
                <p><strong>Status:</strong> {character.status}</p>
                <p><strong>Species:</strong> {character.species}</p>
                <p><strong>Gender:</strong> {character.gender}</p>
                <p><strong>Origin:</strong> {character.origin.name}</p>
                <p><strong>Location:</strong> {character.location.name}</p>
            </div>
        </div>
    )
}