import { useEffect, useContext, useState } from "react"
import { Button } from "@mui/material"
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import UserContext from "../contexts/UserContext"
import Dog_Park_Card from "../components/dog_park_card"
import Grid from '@mui/material/Grid';
import Detailed_Park_Card from "../components/detailed_park_card"
export default function Parks({url}){
    const [parks, setParks] = useState([])
    const [isDisplayingDefault, setIsDisplayingDefault] = useState(true)
    const [isViewingPark, setIsViewingPark] = useState(false)
    const [selectedParkId, setSelectedParkId] = useState(0)
    const [temperature, setTemperature] = useState(null)
    const [isRaining, setIsRaining] = useState(false)

    const userToken = useContext(UserContext)
    const payload = {
            method: "GET",
            headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Token ${userToken}`
                }  }
    const fetchParks = async () => {
        
        const endpoint=`${url}parks`
        const apiData = await fetch(endpoint, payload)
        const apiJSON= await apiData.json()
  
        setParks(apiJSON)
        return apiJSON
   
    }
    const fetchWeather = async () => {
        
        const endpoint=`${url}apis`
        const apiData = await fetch(endpoint, payload)
        const apiJSON= await apiData.json()
  
        console.log(apiJSON.current)
        if(apiJSON.current.precipitation > 0){
            setIsRaining(true)
        }else(setIsRaining(false))
        setTemperature(apiJSON.current.temperature_2m)
        return apiJSON
    }
    useEffect(() => {
        fetchWeather()
        fetchParks()
       
    }, [isDisplayingDefault]);

    const toggleViewingPark = () =>{
        setIsViewingPark(!isViewingPark)
    }
    const toggleDisplayingDefault = () =>{
        setIsDisplayingDefault(!isDisplayingDefault)
    }
    const handleDogParkClick =(id)=>{
     
        setSelectedParkId(id)
        toggleViewingPark()
        toggleDisplayingDefault()
    }
    const closeDetailedView = () =>{
        toggleViewingPark()
        toggleDisplayingDefault()
    }

    return(<>
    {isDisplayingDefault ? (<>
    {temperature}F {isRaining?<ThunderstormIcon />:<WbSunnyIcon />}
<h1>Dog Parks</h1>
{parks.map((park, index)=><Grid onClick={()=>handleDogParkClick(park["id"])} item xs={4} key={index}><Dog_Park_Card key={index} dog_count={park['dogs'].length} dog_park_name={park["dog_park_name"]} /> </Grid>)}
    </>
    ):isViewingPark ? 
    <Detailed_Park_Card url={url} closeDetailedView={closeDetailedView} selectedParkId={selectedParkId}/>
    :null}
    </>)
}