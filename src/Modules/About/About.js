import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const drawerWidth = 240;
export default function About() {
  return (
    

      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          {[0, 1, 2,3].map((value) => (
            <Grid key={value} item>
              <Paper
                sx={{
                  height: 140,
                  width: 100,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

  
  );
}
