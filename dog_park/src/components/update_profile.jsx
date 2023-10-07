import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
export default function Update_Profile({url, handleUpdateProfileClick}){
    
    const [formData, setFormData] = useState({ name: '' });
    const userToken = useContext(UserContext)
    const endpoint = `${url}profile/`
    

    const updateProfile = async (context) => {
        const payload = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${userToken}`
            },
            body: JSON.stringify(context)
          }
        const apiData = await fetch(endpoint, payload)
        const apiJSON= await apiData.json()
        handleUpdateProfileClick()
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
      const context = {name: formData.name}
      const response = await updateProfile(context)
    }
    
    return (
        <>
            <div>
              <form onSubmit={handleSubmit}>
                <div id="update_profile_name"className="form-group">
                  <label htmlFor="name">Name: </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit">Update</button>
              </form>
            </div>
          
          
        </>
      );
}