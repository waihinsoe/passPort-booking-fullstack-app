import { FormControl, TextField } from "@mui/material";

const FormGroup = () => {
  return (
    <FormControl sx={{ width: "100%" }}>
      <TextField id="name" label="Enter your name" variant="standard" />
      <TextField id="email" label="Enter your email" variant="standard" />
      <TextField id="nrc-Nu" label="Enter your nrc number" variant="standard" />
    </FormControl>
  );
};

export default FormGroup;
