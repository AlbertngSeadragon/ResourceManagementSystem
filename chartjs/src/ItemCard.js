import React, { useEffect, useState } from "react";
import moment from "moment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import RemoveItem from "./RemoveItem";
import EditItem from "./EditItem";

function ItemCard({ item, items, setItemsHandler, isModifiable, projects }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography sx={{ p: 2 }}>
            Current details of the item.
            <br />
            Please change the value if you want.
            <RemoveItem
              items={items}
              selectedItemforRemove={item}
              setItemsHandler={setItemsHandler}
              isModifiable={isModifiable}
              handleClose={handleClose}
            />
            <EditItem
              items={items}
              projects={projects}
              selectedItemforEdit={item}
              setItemsHandler={setItemsHandler}
              isModifiable={isModifiable}
              projects={projects}
              handleClose={handleClose}
            />
          </Typography>
        </Box>
      </Modal>
      <Card
        sx={{
          marginTop: "5px",
          marginBottom: "5px",
          backgroundColor: item.bgColor,
        }}
        variant="outlined"
        onClick={isModifiable ? handleOpen : null}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary">
            Project name:
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {item.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.primary">
            Item name:
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {item.description}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.primary">
            Start date:
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {moment(item.start_time).format("Do MMMM YYYY")}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.primary">
            End date:
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {moment(item.end_time).format("Do MMMM YYYY")}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.primary">
            Expense:
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ${item.expense}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default ItemCard;
