import UserContext from '../contexts/UserContext';
import { Button } from '@mui/material';
import { useState, useContext, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Dog_Card from './dog_card';
export default function Detailed_Park_Card({url, selectedParkId, closeDetailedView}){
    const userToken = useContext(UserContext)
    const [park, setPark] = useState(null)
    const [reloadPark, setReloadPark] = useState(false)
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
  
        setPark(apiJSON)
        return apiJSON
   
    }
    useEffect(() => {
        fetchPark()
    }, [reloadPark]);

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
        console.log(apiJSON)
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
        console.log(apiJSON)
        return apiJSON
    }
    return(<>
    <Button variant="outlined" onClick={addMyDogs}>Add My Dogs</Button>
    <Button variant="outlined" onClick={removeMyDogs}>Remove My Dogs</Button>
    <Button variant='outlined' onClick={closeDetailedView}>go back</Button>
    
    <h1>{park ? park['dog_park_name']:""}</h1>
    {park && park['dogs'].length>0 ?
    park['dogs'].map((dog,index)=>(<Grid item xs={4} key={index}><Dog_Card name={dog["name"]} age={dog["age"]} description={dog["description"]} /></Grid>))
    
    
    :"nodogs"}
    <br />
    </>)
}