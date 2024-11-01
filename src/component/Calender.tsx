import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Button } from "@mui/material";
import FormModal from "./Form";
import { IFormEmail } from "../constant/email.constant";
import { FormProvider, useForm } from "react-hook-form";
import { listEmailSend } from "../helper/services";

// Setup the localizer
const localizer = momentLocalizer(moment);

const EmailCalendar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<IFormEmail>();
  const {
    formState: { errors },
    reset,
  } = form;
  const [emailEvents, setEmailEvents] = useState<any>([]);

  const handleSelectEvent = (event: any) => {
    // Handle the selected event
    setOpen(true);
    reset({
      email: event.title,
      date: moment(event.start).format("YYYY-MM-DD"),
      description: event.description,
      id: event.id,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    listEmailSend().then((res) => {
      const listResponse = res.data.data.data?.map((item) => ({
        title: item.email,
        id: item._id,
        start: moment(item.sendDate).toDate(),
        end: moment(item.sendDate).toDate(),
        description: item.description,
      }));
      setEmailEvents(listResponse);
    });
    reset({});
  }, [open]);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px",
          px: 4,
        }}
      >
        <h2>List Email</h2>
        <Button onClick={handleOpen} variant="contained">
          Create
        </Button>
      </Box>
      <Calendar
        localizer={localizer}
        events={emailEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={handleSelectEvent}
      />
      <FormProvider {...form}>
        <FormModal open={open} onClose={handleClose} />
      </FormProvider>
    </div>
  );
};

export default EmailCalendar;
