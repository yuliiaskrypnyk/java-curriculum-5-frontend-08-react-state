import './App.css'
import CharacterGallery from "./components/CharacterGallery.tsx";
import {useEffect, useState} from "react";
//import {characters} from "./Characters.ts";
import {Route, Routes} from "react-router";
import Home from "./components/Home.tsx";
import Header from "./components/Header.tsx";
import CharacterDetailCard from "./components/CharacterDetailCard.tsx";
import CharacterForm from "./components/CharacterForm.tsx";
import {Character} from "./types/RickAndMortyCharacter.ts";
import axios from "axios";

export default function App() {
    const [searchText, setSearchText] = useState("");
    // const [characterList, setCharacterList] = useState<Character[]>(characters);
    const [characterList, setCharacterList] = useState<Character[]>([]);

    useEffect(() => {
        console.log("First time rendering App")
        console.log("Load Characters")

        axios.get("https://rickandmortyapi.com/api/character")
            .then(response => {
                console.log("Request finished")
                setCharacterList(response.data.results)
            })
            .catch((errorResponse) => {
                console.log(errorResponse)
            })

        console.log("After Request")
    }, []);

    const addCharacter = (newCharacter: Character) => {
        setCharacterList((prevList) => [...prevList, newCharacter]);
    };

    const filteredCharacters = characterList
        .filter((character) => character.name.toLowerCase().includes(searchText.toLowerCase()));

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/characters/add" element={<CharacterForm addCharacter={addCharacter}/>} />
                <Route path="/characters" element={
                    <div>
                        <input type="text" onChange={(e) => setSearchText(e.target.value)}
                               placeholder="Search for a character"/>
                        {
                            filteredCharacters.length > 0
                                ? <CharacterGallery characters={filteredCharacters}/>
                                : <p>No characters found</p>
                        }
                    </div>
                }/>
                <Route path="/characters/:id" element={
                    <CharacterDetailCard characters={filteredCharacters} />
                } />
            </Routes>
        </>
    );
}
