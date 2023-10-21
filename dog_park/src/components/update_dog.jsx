import { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import UserContext from '../contexts/UserContext';
import TraitCheckBoxes from './trait_checkboxes';
import CircularIndeterminate from './loading';
export default function Update_Dog({dog_pk,url, closeDogCard}){
    const [traits, setTraits] = useState([])
    const [dislikes, setDislikes] = useState([])

    const [dogTraits, setDogTraits] = useState([])
    const [isDisplayingTraits, setIsDisplayingTraits] = useState(false)
    
    const [dogDislikes, setDogDislikes] = useState([])
    const [isDisplayingDislikes, setIsDisplayingDislikes] = useState(false)
    
    const [dogPhoto, setDogPhoto] = useState()
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
    const [formData, setFormData] = useState({ name: '',age:'',description:''});
    const userToken = useContext(UserContext)
    const dog_number_pk= Number(dog_pk)
    const endpoint = `${url}dog/${dog_number_pk}`
    // updates dog
    const updateDog = async (route) => {
      // makes a new dictionary and adds all data that not blank to it
      // backend is if key exists updated 
        const updatedData = {};
        for (const key in formData) {
          if (formData[key] !== "") {
            // updatedData.append(key, formData[key])
            updatedData[key] = formData[key];
          }
        }
        // add traits gets dogTraits in useeffect [] so should always be up to date
        // should be a list of trait ids
        let dogTraitIds = []
        for(let trait of dogTraits){
          dogTraitIds.push(trait.id)
        }
        let dogDislikesIds = []
        for(let dislike of dogDislikes){
          dogDislikesIds.push(dislike.id)
        }
        // updatedData.append('traits',dogTraitIds)
        // updatedData.append('dislikes', dogDislikesIds)
        updatedData['traits'] = dogTraitIds
        updatedData['dislikes'] = dogDislikesIds
        if(dogPhoto!=undefined){
          setIsUploadingPhoto(true)
          let dogForm = new FormData()
          dogForm.append("picture",dogPhoto, dogPhoto.name)
          const DogPayload = {
            method: "PATCH",
            headers: {
              "Authorization": `Token ${userToken}`
            },
            body: dogForm
            }
            const apiData = await fetch(endpoint, DogPayload)
            setIsUploadingPhoto(false)
            // const apiJSON= await apiData.json()
            // return apiJSON
        }

        // shared payload for patch or delete
        const payload = {
            method: route,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${userToken}`
            },
            body: JSON.stringify(updatedData)
          }
        const apiData = await fetch(endpoint, payload)
        const apiJSON= await apiData.json()
        closeDogCard()
        return apiJSON
    }
    // gets dog traits
    const getDogTraits = async () =>{
      const DogPayload = {
        method: "GET",
        headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${userToken}`
            }, 
        }
        const apiData = await fetch(endpoint, DogPayload)
        const apiJSON= await apiData.json()
        // gets list of dictionary of traits. used to be just ids
        setDogTraits(apiJSON["traits"])
        setDogDislikes(apiJSON["dislikes"])
        return apiJSON
    }


    const getAllTraits = async () =>{
      const traitPayload = {
        method: "GET",
        headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${userToken}`
            }, 
        }
        const traitEndpoint=`${url}trait`
        const apiData = await fetch(traitEndpoint, traitPayload)
        const apiJSON= await apiData.json()
        setTraits(apiJSON)
        setDislikes(apiJSON)
        return apiJSON
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    const handleSubmit = async (route) => {
      const response = await updateDog(route)
    }
    const handleBack = () =>{
      closeDogCard()
    }
    const toggleTraits = () => {
      setIsDisplayingTraits(!isDisplayingTraits)
  }
    const toggleDislike = () => {
    setIsDisplayingDislikes(!isDisplayingDislikes)
}
    const handleTraitButton = () =>{
      toggleTraits()
    }
    const handleDislikeButton = () =>{
      toggleDislike()
    }

    const handleDogPictureChange = (e) =>{
      setDogPhoto(e.target.files[0])
    }

    useEffect(() => {
      getDogTraits()
      getAllTraits()
      
  }, []);
    return (
        <>
            <div>
              <form onSubmit={handleSubmit}>
              <div id="name_update" className="form-group">
                  <label htmlFor="name">Name: </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div id="dog_age_update" className="form-group">
                  <label htmlFor="age">Age: </label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={formData.age}
                    min="0"
                    onChange={handleInputChange}
                  />
                </div>
                
                <div id="dog_description_update" className="form-group">
                  <label htmlFor="description">description: </label>
                  <input
                    id="description"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div id="dogImage" className="form-group">
                <label htmlFor="dogImage">Dog Image:</label>
                  <input 
                    type="file" 
                    name="dogImage" 
                    onChange={handleDogPictureChange} />
                </div>
                <br />
                <Button variant='outlined' onClick={handleTraitButton}>Open traits menu</Button> 
                <Button variant='outlined' onClick={handleDislikeButton}>Open dislikes menu</Button> 
                <br />
                <Button variant="outlined" onClick={()=>handleSubmit("PATCH")}>Update</Button>
                <Button variant="outlined" onClick={()=>handleSubmit("DELETE")}>delete</Button>
                <Button variant="outlined" onClick={handleBack}>Back</Button>
              </form>
              {isUploadingPhoto ? (<><CircularIndeterminate />"uploading photo"</>): null}
              {isDisplayingTraits && <TraitCheckBoxes  dogTraits={dogTraits} setDogTraits={setDogTraits} toggleTraits={toggleTraits} isDisplayingTraits={isDisplayingTraits}  traits={traits} setTraits={setTraits}/>}
              {isDisplayingDislikes && <TraitCheckBoxes  dogTraits={dogDislikes} setDogTraits={setDogDislikes} toggleTraits={toggleDislike} isDisplayingTraits={isDisplayingDislikes}  traits={dislikes} setTraits={setDislikes}/>}
            </div>
        </>
      );
}