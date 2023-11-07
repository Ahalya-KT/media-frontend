import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addCategories,
  deleteCategory,
  getallcategory,
  getvideo,
  updateCategory,
} from "../services/all-api";
import { useEffect } from "react";
import { Trash2 } from "feather-icons-react/build/IconComponents";
import { Col, Row } from "react-bootstrap";
import Videocard from "./Videocard";

function Category() {
  const [allCategory, setallCategory] = useState([]);

  const [show, setShow] = useState(false);
  const [CategoryItem, setCategoryItem] = useState({
    id: "",
    categoryName: "",
    allvideos: [],
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCategoryList = async () => {
    const response = await getallcategory();
    console.log(response.data);
    setallCategory(response.data);
  };
  console.log(allCategory);

  useEffect(() => {
    getCategoryList();
  }, []);

  const addCategoryForm = (e) => {
    const { name, value } = e.target;
    setCategoryItem({ ...CategoryItem, [name]: value });
  };

  console.log(CategoryItem);

  //defining the function to delete
  const handleDeleteCategory = async (e, id) => {
    //to prevent reload
    e.preventDefault();
    console.log(id);
    //calling function from all-api.jsx
    await deleteCategory(id);
    //to show balance data
    getCategoryList();
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const { id, categoryName } = CategoryItem;
    if (!id || !categoryName) {
      toast.success("please fill the form ");
    } else {
      const response = await addCategories(CategoryItem);
      toast.success("new category added ");
    }
    //to show when category added
    getCategoryList();
  };

  //drag over
  const dragover = (e) => {
    e.preventDefault();
    console.log("draging over the category board!!!");
  };

  // dropped
  const dropped = async (e, categoryId) => {
    console.log("dropped categoryid", categoryId);
    let sourceCardId = e.dataTransfer.getData("cardId");
    console.log("source card id is", sourceCardId);

    //logic to implement adding card in the given category

    let { data } = await getvideo(sourceCardId);
    // console.log(response);
    console.log("source video data", data);

    let selectCategory = allCategory.find((item) => item.id == categoryId);
    console.log(" target category details", selectCategory);
    selectCategory.allvideos.push(data);
    console.log("updated target category details", selectCategory);
    await updateCategory(categoryId, selectCategory);
    getCategoryList();
  };

  return (
    <>
      {/* to get big button we use d-grid */}
      <div className="d-grid">
        <div onClick={handleShow} className="btn btn-dark m-2">
          Add Categories
        </div>
      </div>

      {/* to display data */}

      {allCategory?.map((item) => (
        <div>
          <div
            droppable
            onDragOver={(e) => dragover(e)}
            onDrop={(e) => dropped(e, item?.id)}
            className="d-flex justify-content-between border rounded mt-2 p-3"
          >
            <h4>{item.categoryName}</h4>
            <span onClick={(e) => handleDeleteCategory(e, item?.id)}>
              <Trash2 color="red"></Trash2>
            </span>
            {/* to show the draged cards in the category */}
            <Row>
              {item?.allvideos.map((card) => (
                <Col className="p-3 mb-1 sm{12}">
                  <Videocard card={card} insidecategory={true} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ))}

      {/* model from react bootstap */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className="mb-3" controlId="floatingId" label="  Id">
            <Form.Control
              type="text"
              name="id"
              onChange={addCategoryForm}
              placeholder="Id"
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-3"
            controlId="floatingId"
            label=" Category"
          >
            <Form.Control
              type="text"
              name="categoryName"
              onChange={addCategoryForm}
              placeholder="video id"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddCategory} variant="primary">
            ADD
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Category;
