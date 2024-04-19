import React from 'react';
import { Grid, Button } from '@mui/material';


function UserFavoritesPage() {

    const handleClick = async() => {
        try{
            const response = await fetch("http://localhost:3000/api/recommendations");
            if(response.ok){
                let data = await response.json();
            }
        } catch(error){
            console.log(error);
        }
        
    }
    return (
        <Grid container spacing={2}>
            <Button onClick={handleClick}></Button>
        </Grid>
    );

}
export default UserFavoritesPage;