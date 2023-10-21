import { useEffect, useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import UserContext from '../contexts/UserContext';
import Update_Profile from '../components/update_profile';
import Add_Dog from '../components/add_dog';
import Dog_Card from '../components/dog_card';
import Update_Dog from '../components/update_dog';
export default function MyProfile({ user, setUser, url}){
    const [isDisplayingDefault, setIsDisplayingDefault] = useState(true);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isAddingADog, setIsAddingADog] = useState(false);
    const [dogs, setDogs] = useState(null)
    const [isUpdatingDog, setIsUpdatingDog] = useState(false)
    const [selectedDogPk, setSelectedDogPk] = useState(0)
    const userToken = useContext(UserContext)
    const payload = {
            method: "GET",
            headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Token ${userToken}`
                }  }
    const fetchUsers = async () => {
        
        const endpoint=`${url}profile`
        const apiData = await fetch(endpoint, payload)
        const apiJSON= await apiData.json()
    
        setUser(apiJSON)   
        return apiJSON
    }
    const fetchDogs = async () => {
        const endpoint =`${url}dog`
        const apiData = await fetch(endpoint, payload)
        const apiJSON= await apiData.json()
        setDogs(apiJSON)
        console.log(apiJSON)
        return apiJSON

    }
    useEffect(() => {
        fetchUsers()
    }, [isDisplayingDefault]);
    useEffect(() =>{
        fetchDogs()
    },[isDisplayingDefault])
    const toggleDisplayDefault = () =>{
        setIsDisplayingDefault(!isDisplayingDefault)
    }
    const toggleUpdatingProfile = () =>{
        setIsUpdatingProfile(!isUpdatingProfile)
    }
    const handleUpdateProfileClick = () =>{
        toggleDisplayDefault()
        toggleUpdatingProfile()
    }
    const toggleAddingADog = () =>{
        setIsAddingADog(!isAddingADog)
    }
    const handleAddADogClick = () =>{
        toggleAddingADog()
        toggleDisplayDefault()
    }
    const toggleUpdatingDog = ()=>{
        setIsUpdatingDog(!isUpdatingDog)
    }
    const handleDogCardClick =(pk)=>{
      
        setSelectedDogPk(pk)
        toggleUpdatingDog()
        toggleDisplayDefault()
    }
    const closeDogCard =()=>{
        toggleUpdatingDog()
        toggleDisplayDefault()
    }
    const handleRemoveDogs = async () =>{
      const removePatchPayload = {
        method: "PATCH",
        headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${userToken}`
            },
            body: JSON.stringify({ function: "remove" })  
        }
        const endpoint=`${url}parks/`
        const apiData = await fetch(endpoint, removePatchPayload)
        const apiJSON= await apiData.json()
        console.log(apiJSON)
        return apiJSON
    }
    
    return (
        <>
          {isDisplayingDefault ? (
            <>
              <Button onClick={handleUpdateProfileClick} variant='outlined'>Update Profile</Button>
              <Button onClick={handleAddADogClick} variant='outlined'>Add A Dog</Button>
              <Button onClick={handleRemoveDogs} variant='outlined'>Remove dogs from parks</Button>
              <h1>Profile page</h1>
              <h3>Hello {user ? user["name"]:"buddy"}</h3>
                {dogs && dogs.map((dog,index)=><Grid onClick={()=>handleDogCardClick(dog["id"])} item xs={4} key={index}><Dog_Card traits={dog["traits"]} picture={dog["picture"]} dislikes={dog["dislikes"]} name={dog["name"]} age={dog["age"]} description={dog["description"]} /></Grid>)}
            </>
          ) : 
          isUpdatingProfile ? (
            <Update_Profile url={url} handleUpdateProfileClick={handleUpdateProfileClick} />
          ):
          isAddingADog ? (
            <Add_Dog url={url} handleAddADogClick={handleAddADogClick}/>
          ):
          isUpdatingDog ? (
            <Update_Dog url={url} dog_pk={selectedDogPk} closeDogCard={closeDogCard}/>
          ):
          (null)}
        </>
      );
}