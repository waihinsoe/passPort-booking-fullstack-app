import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DatePicker from "../DatePicker/DatePicker";
import TimePicker from "../TimePicker/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { Availability } from "../DatePicker/DatePicker";
import { useEffect, useState } from "react";
import Form from "../FormGroup/FormGroup";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

const BookingSteps = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [month, setMonth] = useState<number | undefined>();
  const [availability, setAvailability] = useState<Availability[]>();

  console.log("date", date);
  console.log("month", month);
  console.log("availability", availability);

  useEffect(() => {
    fetchAvailability();
  }, [month]);

  const fetchAvailability = async () => {
    const chosenMonth = month ? month : dayjs().month();
    const respone = await fetch(
      `http://localhost:5000/availability?month=${chosenMonth}`
    );
    const data = await respone.json();
    setAvailability(data.availability);
    console.log("render");
  };

  const getDataForChosenDate = () => {
    return availability?.filter(
      (item) => item.date === date?.format("DD-MM-YYYY")
    )[0];
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%", height: 200 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (
            <>
              {" "}
              <DatePicker
                date={date}
                handleDateChange={setDate}
                month={month}
                handleMonthChange={setMonth}
                availability={availability}
              />
              <TimePicker dataForChosenDate={getDataForChosenDate()} />
            </>
          )}
          {activeStep === 1 && <Form />}

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default BookingSteps;
