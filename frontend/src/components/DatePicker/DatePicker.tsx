import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState } from "react";

interface Slot {
  time: number;
  reserved: number;
  totalAvailable: number;
  availableSlot: number;
}

export interface Availability {
  date: string;
  month: string;
  slots: Slot[];
}

interface Props {
  date: Dayjs | null;
  handleDateChange: (value: Dayjs | null) => void;
  month: number | undefined;
  handleMonthChange: (vaule: number | undefined) => void;
  availability?: Availability[];
}

const DatePicker = ({
  date,
  handleDateChange,
  month,
  handleMonthChange,
  availability,
}: Props) => {
  const currentMonthAvailability = availability?.filter((item) => {
    return parseInt(item.month, 10) === month ? month : dayjs().month();
  });

  const shouldDisableDate = (value: Dayjs | null) => {
    const currentDate = currentMonthAvailability?.find((item) => {
      return item.date === value?.format("DD-MM-YYYY");
    });

    const isAvailabe = currentDate?.slots.some(
      (item) => item.availableSlot !== 0
    );
    return isAvailabe ? false : true;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack sx={{ mt: 2 }} spacing={3}>
        <DesktopDatePicker
          label="Select Date"
          inputFormat="DD/MM/YYYY"
          shouldDisableDate={shouldDisableDate}
          value={date}
          onChange={(value) => handleDateChange(value)}
          onMonthChange={(value) => {
            handleMonthChange(value?.month());
            handleDateChange(null);
          }}
          disablePast
          disableHighlightToday
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePicker;
