import axios from 'axios';
import { useEffect, useState, useTransition } from 'react';

export const PokemonList = ()=>{
        const [dataList,setDataList] = useState([]);
        const [previous,setPrevious] = useState();
        const [next,setNext] = useState();
        const [current,setCurrent] = useState('https://pokeapi.co/api/v2/pokemon');
        const [isPending,startTransition] = useTransition()
     
            useEffect(() => {
                console.log(current)
              axios.get(current)
              .then(res=>{
                startTransition(()=>{
                    setDataList(res.data.results)
                    setPrevious(res.data.previous)
                    setNext(res.data.next)
                })
                
              })
        },[current])
        function goBack(){
            setCurrent(previous?previous:'https://pokeapi.co/api/v2/pokemon')
        }
        function goNext(){
            console.log(previous,current,next)
            setCurrent(next)
        }

    return (
        <ul>
            {isPending && 'Loading...'}
            {
              dataList.map(d=>{
                    return <li key={d.url}>{d.name}</li>
                })
            }
            <button className='btn btn-primary' onClick={()=>goBack()}>Previous</button>
             <button className='btn btn-primary' onClick={()=>goNext()}>NEXT</button>
        </ul>
    )
}