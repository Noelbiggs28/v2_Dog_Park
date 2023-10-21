import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from "@mui/material"
import { Grid } from "@mui/material"

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { Button } from "@mui/material"


export default function TraitCheckBoxes({traits, dogTraits, setDogTraits, toggleTraits, isDisplayingTraits, setTraits}){
// const traits = ["Friendly","Aggresive", "Small Dog", "Large dog"]
const handleCheckboxChange = (event, selectedTrait) => {
    if (event.target.checked) {
      // add trait to list if checked
      setDogTraits((prevDogTraits) => [...prevDogTraits, selectedTrait]);
    } else {
      // remove trait from list if unchecked
      setDogTraits((prevDogTraits) =>
        prevDogTraits.filter((trait) => trait['id'] !== selectedTrait['id'])
      );
    }
  };    
  
  
  const handleClose = () => toggleTraits();
  // set Model style
  const style = {
    // sets top left corner to center of the screen
    position: 'absolute',
    top: '50%',
    left: '50%',
    // centers it
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
    
    return(<>
    {/* makes the popup modal */}
      <Modal
            open={isDisplayingTraits}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
      >
      {/* formats modal to center of screen and transistions */}
        <Box sx={style}>
          {/* makes it multiple columns */}
            <Grid >
         
              {/* takes names traits */}
              {/* traits is a list of dictionarys [{id:1,Name}] */}
              {/* each trait is a dictionary */}
              {traits.map((trait, index)=>
              // makes a lable for each trait
                <FormControlLabel key={index} control={
                  // makes checkbox remembers based on Traits state
                  <Checkbox checked={dogTraits.some(dogTrait => (dogTrait['id'] === trait['id']))}
                  onChange={(event) => handleCheckboxChange(event, trait)}
                  // names it
              />} label={trait["name"]} />)}
              <br />
              <Button variant="outlined" onClick={handleClose}>Close</Button>
            </Grid>
        </Box>
      </Modal>
    </>)
}