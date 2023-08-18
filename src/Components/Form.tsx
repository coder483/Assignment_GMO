import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';


const Form: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    phone: '',
    email: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (formData.FirstName && formData.LastName && formData.phone && formData.email ) {
      localStorage.setItem('userData', JSON.stringify(formData));
      navigate('/second');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
   <div className="container" style={{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    height:'100vh',
    width:'100vw'
   }}>
    <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Users Information
          </Typography>  
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                <TextField
                 label="FirstName"
                 name="FirstName"
                 value={formData.FirstName}
                 onChange={handleInputChange}
                />
                </Grid>
                <Grid xs={12} sm={6} item>
                <TextField
                 label="LastName"
                 name="LastName"
                 value={formData.LastName}
                 onChange={handleInputChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                 label="Phone"
                 name="phone"
                 value={formData.phone}
                 onChange={handleInputChange}
                 fullWidth 
                 />
                </Grid>
                <Grid item xs={12}>
                <TextField
                 label="Email"
                 name="email"
                 value={formData.email}
                 onChange={handleInputChange}
                 fullWidth 
                 />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} fullWidth>Submit</Button>
                </Grid>

              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
   </div>
  );
};

export default Form;
