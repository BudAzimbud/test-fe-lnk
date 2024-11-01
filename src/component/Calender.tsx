import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Button } from "@mui/material";
import FormModal from "./Form";
import { IFormEmail } from "../constant/email.constant";
import { FormProvider, useForm } from "react-hook-form";
import { listEmailSend } from "../helper/services";
import Layout from "./Layout";

// Setup the localizer
const localizer = momentLocalizer(moment);

const EmailCalendar: React.FC = () => {
  const clickRef = useRef<number | undefined>(undefined);




  const defaultDate = useMemo(() => new Date(), []);
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

  useEffect(() => {
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
    return () => {
      window.clearTimeout(clickRef?.current);
    };
  }, []);

  const onSelectSlot = useCallback((slotInfo: any) => {
    /**
     * Here we are waiting 250 milliseconds (use what you want) prior to firing
     * our method. Why? Because both 'click' and 'doubleClick'
     * would fire, in the event of a 'doubleClick'. By doing
     * this, the 'click' handler is overridden by the 'doubleClick'
     * action.
     */
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.setTimeout(() => {
      setOpen(true)
      reset({
        email: "",
        date: moment(slotInfo.slots[0]).format('YYYY-MM-DD'),
        description: "",
      })
    }, 250);
  }, []);

  return (
    <Layout>
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
        selectable
        defaultDate={defaultDate}
        onSelectSlot={onSelectSlot}
      />
      <FormProvider {...form}>
        <FormModal open={open} onClose={handleClose} />
      </FormProvider>
    </Layout>
  );
};

export default EmailCalendar;
