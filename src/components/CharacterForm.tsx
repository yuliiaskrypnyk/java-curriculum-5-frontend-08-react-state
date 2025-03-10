import {Character} from "../types/RickAndMortyCharacter.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router";

type CharacterFormProps = {
    addCharacter: (characterToAdd: Character) => void
}

export default function CharacterForm(props: CharacterFormProps) {
    const [newCharacter, setNewCharacter] = useState<Character>({
        id: 0,
        name: "",
        status: "",
        species: "",
        gender: "",
        origin: { name: "", url: "" },
        location: { name: "", url: "" },
        image: "",
    });

    const navigate = useNavigate()

    const onSaveClick = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        props.addCharacter(newCharacter)
        navigate("/characters")
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (
            name === "origin.name" ||
            name === "origin.url" ||
            name === "location.name" ||
            name === "location.url"
        ) {
            const [field, subField] = name.split(".") as ["origin" | "location", "name" | "url"];
            setNewCharacter((prevCharacter) => ({
                ...prevCharacter,
                [field]: {
                    ...(prevCharacter[field] as { name: string; url: string }),
                    [subField]: value,
                },
            }));
        } else {
            setNewCharacter((prevCharacter) => ({
                ...prevCharacter,
                [name]: value,
            }));
        }
    };

    return(
        <form onSubmit={onSaveClick}>
            <input name={"id"} required={true} value={newCharacter?.id} placeholder={"ID"} onChange={onChange} />
            <input name={"name"} value={newCharacter?.name} placeholder={"Name"} onChange={onChange} />
            <input name={"status"} value={newCharacter?.status} placeholder={"Status"} onChange={onChange} />
            <input name={"species"} value={newCharacter?.species} placeholder={"Species"} onChange={onChange} />
            <input name={"gender"} value={newCharacter?.gender} placeholder={"Gender"} onChange={onChange} />
            <input name={"origin.name"} value={newCharacter?.origin.name} placeholder={"Origin Name"} onChange={onChange} />
            <input name={"origin.url"} value={newCharacter?.origin.url} placeholder={"Origin URL"} onChange={onChange} />
            <input name={"location.name"} value={newCharacter?.location.name} placeholder={"Location Name"} onChange={onChange} />
            <input name={"location.url"} value={newCharacter?.location.url} placeholder={"Location URL"} onChange={onChange} />
            <input name={"image"} value={newCharacter?.image} placeholder={"Image URL"} onChange={onChange} />
            <button type="submit">Add Character</button>
            <button type="button" onClick={() => {console.log("Options Click")}}>Options</button>
        </form>
    )

}