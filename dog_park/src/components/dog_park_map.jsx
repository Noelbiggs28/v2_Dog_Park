import { Button } from '@mui/material';
export default function Dog_Park_Map({toggleMap, mapkey}){
const endpoint = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBcIM7KCz-jSOPA0DCL_hTYjioXG7bdwro&q=${mapkey}`
    return(<>
    <Button variant="outlined" onClick={toggleMap}>close map</Button>
        <iframe
            width="600"
            height="450"
            style={{"border":"0"}}
            loading="lazy"
            allowfullscreen
            referrerPolicy="no-referrer-when-downgrade"
            src={endpoint}>
        </iframe>

        </>)
}