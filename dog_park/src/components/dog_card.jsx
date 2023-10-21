import { Box } from "@mui/material"

export default function Dog_Card({name,picture, dislikes, traits, age, description}){

    return(<>
   
    <div className="dogCard">
    <Box sx={{border: '1px solid grey', display:"flex", alignItems:"flex-start"}}>
        <Box sx={{ display: 'inline-block', margin : "10px"}}>
            <img height="200px" src={picture} />
        </Box>
        <Box id="dogCardDescriptors" sx={{ display: 'inline-block', alignItems: 'flex-start'}}>
            <p>
                Name:{name}
            </p>
            <p>
                Age:{age}
            </p>
            <p>
                Description:{description}
            </p>
                Traits: {traits&&traits.length>1 ? traits.map((trait,index)=><Box key={index} sx={{border: '1px solid grey', display: 'inline-block',marginRight:'5px', padding: '2px',borderRadius: '8px'}}>{trait['name']} </Box> ) :
                traits.length===1 ? <Box sx={{border: '1px solid grey', display: 'inline-block',marginRight:'5px', padding: '2px',borderRadius: '8px'}}>{traits[0]['name']}</Box> : "no traits selected"}
                <p></p>
                Dislikes: {dislikes&&dislikes.length>1 ? dislikes.map((dislike,index)=><Box key={index} sx={{border: '1px solid grey', display: 'inline-block',marginRight:'5px', padding: '2px',borderRadius: '8px'}}>{dislike['name']} </Box> ) :
                dislikes.length===1 ? <Box sx={{border: '1px solid grey', display: 'inline-block',marginRight:'5px', padding: '2px',borderRadius: '8px'}}>{dislikes[0]['name']}</Box> : "no dislikes selected"}
        </Box>
    </Box>
    </div>
    </>)
}