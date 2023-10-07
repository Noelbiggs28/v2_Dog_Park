import { Box } from "@mui/material"

export default function Dog_Park_Card({dog_park_name, dog_count}){

    return(<>
    <div className="dogCard">

    <Box sx={{border: '1px solid grey'}}>
    <p>
        Name:{dog_park_name}
    </p>
    <p>
        Dogs:{dog_count}
    </p>

    
    </Box>
  
    </div>
    </>)
}