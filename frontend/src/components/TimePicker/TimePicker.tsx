import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Availability } from "../DatePicker/DatePicker";

interface Props {
  dataForChosenDate: Availability | undefined;
}

const TimePicker = ({ dataForChosenDate }: Props) => {
  if (!dataForChosenDate) return null;
  const slots = dataForChosenDate?.slots;

  return (
    <FormControl sx={{ mt: 2 }}>
      <FormLabel id="demo-radio-buttons-group-label">Select Time</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {slots &&
          slots.map((slot) => {
            if (slot.availableSlot === 0) return null;
            return (
              <FormControlLabel
                key={slot.time}
                value={slot.time}
                control={<Radio />}
                label={slot.time + " o'clock"}
              />
            );
          })}
      </RadioGroup>
    </FormControl>
  );
};

export default TimePicker;
