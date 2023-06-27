import { FormEvent, useEffect, useRef, useState } from 'react'

interface Pokemon {
            id: number,
            name: string, 
            img: string, 
            ability: string
        }

const PokemonCard = () => {

        const inputRef = useRef<HTMLInputElement>(null)
      
        const handleSubmit = (event: FormEvent) => {
          if (inputRef.current !== null) {
            event.preventDefault()
            let input = inputRef.current.value
          }
        }
        
        const [pokemon, setPokemon] = useState<Pokemon>({
            id: 0,
            name: '',
            img: '', 
            ability: ''
        })

        useEffect(() => {
            const getPokemon = async () => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/{input}`)
                const data = await response.json()
                setPokemon({
                    id: data.id,
                    name: data.name,
                    img: data.sprints.front_default,
                    ability: data.abilties[0].ability.name
                })
            }
            getPokemon()
        }, [])

        return (
          <>
            <div >
              <form className='form' onSubmit={handleSubmit}>
                <label htmlFor="todo">Search for a Pokemon </label><br />
                <input type="text" ref={inputRef}/>
                <button type="submit">Search</button>
              </form>
            </div>

            <div className="card" style={{width: '18rem'}}>
                <img src="{pokemon.img}" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{pokemon.name}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{pokemon.id}</li>
                    <li className="list-group-item">{pokemon.ability}</li>
                </ul>
            </div>
          </>
        )
      
}

export default PokemonCard