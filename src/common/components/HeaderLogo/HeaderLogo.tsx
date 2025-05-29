import Grid from '@mui/material/Grid';
import divider from "../../../assets/images/divider.png";
import secondaryLogo from "../../../assets/images/secondary-logo.png";

export default function HeaderLogo() {
  return (
      <Grid container spacing={2} direction={{ xs: 'column', sm: 'row' }}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
          marginBottom: "15px"
        }}>
        <Grid size={{ xs: 12, sm: 8, md: 8, lg : 10 }}>
          <img src={divider} 
               alt="Icon divider" 
               className="h-10" 
               style={{
                  width: 'auto',
                  minWidth: '60px', 
                  maxWidth: '100%',
                  objectFit: 'cover',
                  objectPosition: 'left' 
                }}/>
        </Grid>
        <Grid size={{ xs: 12, sm: 4, md: 4, lg : 2 }}>
          <img
            src={secondaryLogo}
            alt="Secondary Logo"
          />
        </Grid>
      </Grid>
  );
}
