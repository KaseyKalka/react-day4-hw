import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface Pokemon {
            id: number,
            name: string, 
            img: string, 
            ability: string
        }

const PokemonCard = () => {

        //const inputRef = useRef<HTMLInputElement>(null)
      
        const handleSubmit = (event: FormEvent) => {
            event.preventDefault()
            console.log(pokemonName)
            getPokemon()
        }

        // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        //     setPokemonName(event.target.value)
        //     console.log(pokemonName)
        // }

        const [pokemonName, setPokemonName] = useState<string>('')
        
        const [pokemon, setPokemon] = useState<Pokemon>({
            id: 0,
            name: '',
            img: '', 
            ability: ''
        })

        const getPokemon = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            const data = await response.json()
            setPokemon({
                id: data.id,
                name: data.name,
                img: data.sprites.front_default,
                ability: data.abilities[0].ability.name
            })
        }

        useEffect(() => {
            getPokemon()
        }, [])

        return (
          <>
            <div >
              <form className='form' onSubmit={handleSubmit}>
                <label htmlFor="todo">Search for a Pokemon </label><br />
                <input type="text" value={pokemonName} onChange={(event) => setPokemonName(event.target.value)}/>
                <button type="submit">Search</button>
              </form>
            </div>

            <div className="card" style={{width: '18rem'}}>
                <img src={pokemon.img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{pokemon.name}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Pokemon Number: {pokemon.id}</li>
                    <li className="list-group-item">{pokemon.ability}</li>
                </ul>
            </div>
          </>
        )
      
}

export default PokemonCard