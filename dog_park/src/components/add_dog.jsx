import { useState, useContext } from 'react';
import { Button } from '@mui/material';
import UserContext from '../contexts/UserContext';
export default function Add_Dog({url, handleAddADogClick}){
    
    const [formData, setFormData] = useState({ dog_name: '',age:'',description:''});
    const userToken = useContext(UserContext)
    const endpoint = `${url}dog/`
    const addDog = async (context) => {
        const payload = {
            method: "Post",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${userToken}`
            },
            body: JSON.stringify(context)
          }
        const apiData = await fetch(endpoint, payload)
        const apiJSON= await apiData.json()
        handleAddADogClick()
        return apiJSON
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    const handleSubmit = async (e) => {
      e.preventDefault()
      const context = {name: formData.dog_name, age: formData.age, description: formData.description}
      const response = await addDog(context)
      return response
    }
    const handleBack = () =>{
      handleAddADogClick()
    }
    return (
        <>
            <div>
              <form onSubmit={handleSubmit}>
                <div id="add_a_dog_form" className="form-group">
                  <label htmlFor="dog_name">Name: </label>
                  <input
                    type="text"
                    id="dog_name"
                    name="dog_name"
                    value={formData.dog_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age">Age: </label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    min="0"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">description: </label>
                  <input
                    id="description"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button variant='outlined' type="submit">Add dog</Button>
            <Button variant="outlined" onClick={handleBack}>Back</Button>
              </form>
            </div>
        </>
      );
}