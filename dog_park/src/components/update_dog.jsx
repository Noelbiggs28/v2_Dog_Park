import { useState, useContext } from 'react';
import { Button } from '@mui/material';
import UserContext from '../contexts/UserContext';
export default function Update_Dog({dog_pk,url, closeDogCard}){
    const [formData, setFormData] = useState({ name: '',age:'',description:''});
    const userToken = useContext(UserContext)
    const dog_number_pk= Number(dog_pk)
    const endpoint = `${url}dog/${dog_number_pk}`
    
    const updateDog = async (route) => {
        const updatedData = {};
        for (const key in formData) {
          if (formData[key] !== "") {
            updatedData[key] = formData[key];
          }
        }
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
                <Button variant="outlined" onClick={()=>handleSubmit("PATCH")}>Update</Button>
                <Button variant="outlined" onClick={()=>handleSubmit("DELETE")}>delete</Button>
                <Button variant="outlined" onClick={handleBack}>Back</Button>
              </form>
            </div>
        </>
      );
}