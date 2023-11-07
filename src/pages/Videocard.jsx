import { Trash2 } from "feather-icons-react/build/IconComponents";
import React from "react";
//imported from react bootstrap
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Addhistory, deleteVideo } from "../services/all-api";
import { v4 as uuidv4 } from "uuid";

function Videocard({ card, handledeleteStatus, insidecategory }) {
  //card is accesing from view.jsx
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);

    //to get automatic id
    const uid = uuidv4();
    let cardTime = new Date();
    console.log(cardTime);
    console.log(uid);

    //destructing caption and url
    const { caption, url } = card;

    if (uid != "" && caption != "" && url != "" && cardTime != "") {
      const body = {
        id: uid,
        cardName: caption,
        url,
        date: cardTime,
      };
      const response = await Addhistory(body);
      console.log(response);
    }
  };

  //video remove
  const removeItem = async (id) => {
    //make call to all api
    let response = await deleteVideo(id);

    if (response.status >= 200 && response.status < 300) {
      handledeleteStatus(true);
    }
  };
  // function for drag and drop
  const dragStarted = (e, id) => {
    console.log("drag started $ source card id:", id);
    e.dataTransfer.setData("cardId", id);
  };
  return (
    <>
      <div>
        {/* drag and drop */}
        <Card
          draggable
          onDragStart={(e) => dragStarted(e, card?.id)}
          className="shadow"
        >
          <Card.Img
            onClick={handleShow}
            variant="top"
            height={"200px"}
            src={card?.thumbnail}
          />
          <Card.Body>
            <Card.Title>
              <span>
                {/* ? is used if there is only data it will display */}
                {card?.caption}
              </span>
            </Card.Title>
            {insidecategory ? (
              ""
            ) : (
              <Trash2
                onClick={() => removeItem(card?.id)}
                color="red"
                style={{ float: "right" }}
              />
            )}
          </Card.Body>
        </Card>

        {/* model from react bootstrap */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Video Caption</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* video from utube */}
            {/* for autoplay in src give ? and set autoplay=1 */}
            <iframe
              width={"100%"}
              height={"400px"}
              src={`${card?.url}?autoplay=1`}
            ></iframe>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Videocard;
