import { Box } from "@mui/material"

export default function Dog_Card({name, age, description}){

    return(<>
    <div className="dogCard">

    <Box sx={{border: '1px solid grey'}}>
    <p>
        Name:{name}
    </p>
    <p>
        Age:{age}
    </p>
    <p>
        Description:{description}
    </p>
    
    </Box>
  
    </div>
    </>)
}