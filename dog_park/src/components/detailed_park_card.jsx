import UserContext from '../contexts/UserContext';
import { Button } from '@mui/material';
import { useState, useContext, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Dog_Card from './dog_card';
import Dog_Park_Map from './dog_park_map';
export default function Detailed_Park_Card({url, selectedParkId, closeDetailedView}){
    const userToken = useContext(UserContext)
    const [park, setPark] = useState(null)
    const [reloadPark, setReloadPark] = useState(false)
    const [myDogs, setMyDogs] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [showMap, setShowMap] = useState(false)
    const [problemDogs, setproblemDogs] = useState([])
    const [myTraits, setMyTraits] = useState([])
    const [myDislikes, setMyDislikes] = useState([])
    const toggleReloadPark = () =>{
        setReloadPark(!reloadPark)
    }
    const payload = {
            method: "GET",
            headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Token ${userToken}`
                }  }
    const fetchPark = async () => {
        const park_id = Number(selectedParkId)
        const endpoint=`${url}parks/${park_id}`
        const apiData = await fetch(endpoint, payload)
        const apiJSON= await apiData.json()
        console.log(apiJSON['mapkey'])
        setPark(apiJSON)
        fetchDogs()
        return apiJSON
    }

    const fetchDogs = async () => {
        const endpoint =`${url}dog`
        const apiData = await fetch(endpoint, payload)
        const apiJSON= await apiData.json()
        let traits=[]
        let dislikes = []
        let names = []
        for(let dog of apiJSON){
            names.push(dog['id'])
            for(let trait of dog['traits']){
                traits.push(trait['name'])
            }
            for(let dislike of dog['dislikes']){
                dislikes.push(dislike['name'])
            }
        }
        setMyDislikes(dislikes)
        setMyTraits(traits)
        setMyDogs(names)
        setLoaded(true)
        return apiJSON

    }

    const addPatchPayload = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${userToken}`
        },
        body: JSON.stringify({ function: "add" })  
    }
    
    const addMyDogs = async () =>{
        const park_id = Number(selectedParkId)
        const endpoint=`${url}parks/${park_id}`
        const apiData = await fetch(endpoint, addPatchPayload)
        const apiJSON= await apiData.json()
        
        toggleReloadPark()
        return apiJSON
    }
    const removePatchPayload = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${userToken}`
        },
        body: JSON.stringify({ function: "remove" })  
    }
    const removeMyDogs = async () =>{
        const park_id = Number(selectedParkId)
        const endpoint=`${url}parks/${park_id}`
        const apiData = await fetch(endpoint, removePatchPayload)
        const apiJSON= await apiData.json()
        toggleReloadPark()
        
        return apiJSON
    }
    const toggleMap = () =>{
        setShowMap(!showMap)
    }
    const checkForProblems = () =>{
        let problems = []
        for(let dog of park['dogs']){
            if(!myDogs.includes(dog['id'])){
                for(let trait of dog['traits']){
                    if(myDislikes.includes(trait['name'])){
                        problems.push(dog['name'])
                    }
                }
                for(let dislike of dog['dislikes']){
                    if(myTraits.includes(dislike['name'])){
                        problems.push(dog['name'])
                    }
                }
            }
        }
        const unique = Array.from(new Set(problems))
        setproblemDogs(unique.join(' '))
        }
        
    useEffect(() => {
            if(loaded){
                checkForProblems()
            }
            
        }, [loaded]);

    useEffect(() => {
        fetchPark()
        
    }, [reloadPark]);
    
    return(<>

    <Button variant="outlined" onClick={addMyDogs}>Add My Dogs</Button>
    <Button variant="outlined" onClick={removeMyDogs}>Remove My Dogs</Button>
    <Button variant='outlined' onClick={toggleMap}>show map</Button>
    <Button variant='outlined' onClick={closeDetailedView}>go back</Button>
    {showMap && <Dog_Park_Map mapkey={park['mapkey']} toggleMap={toggleMap}  />}
    
    <h1>{park ? park['dog_park_name']:""}</h1>
    <p>
        Dogs to watch out for: {problemDogs}
        </p>
    {park && park['dogs'].length>0 ?
    park['dogs'].map((dog,index)=>(<Grid item xs={4} key={index}><Dog_Card traits={dog["traits"]} picture={dog['picture']} dislikes={dog['dislikes']} name={dog["name"]} age={dog["age"]} description={dog["description"]} /></Grid>))
    
    
    :"nodogs"}
    <br />
    </>)
}