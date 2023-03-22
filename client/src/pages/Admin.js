import React, { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import CreateCategory from "../components/modals/CreateCategory";
import CreateSection from "../components/modals/CreateSection";
import EditSection from "../components/modals/EditSection";
import EditCategory from "../components/modals/EditCategory";
import CreateDevice from "../components/modals/CreateDevice";
import CreateSlide from "../components/modals/CreateSlide";
import EditSlideShow from "../components/modals/EditSlideShow";
import CreateArticle from "../components/modals/CreateArticle";
import EditArticle from "../components/modals/EditArticle";
import ModalInfo from "../components/modals/ModalInfo";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { editInfo } from "../http/deviceAPI";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";

const Admin = observer(() => {
  const { info } = useContext(Context);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [delCategoryVisible, setDelCategoryVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [delSectionVisible, setDelSectionVisible] = useState(false);
  const [slideVisible, setSlideVisible] = useState(false);
  const [editSlideShowVisible, setEditSlideShowVisible] = useState(false);
  const [articleVisible, setArticleVisible] = useState(false);
  const [editArticleVisible, setEditArticleVisible] = useState(false);
  const [logo, setLogo] = useState(info.logo);
  const [siteName, setSiteName] = useState(info.siteName);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const selectFile = (e) => {
    setLogo(e.target.files[0]);
  };

  const changeInfo = () => {
    const formData = new FormData();
    formData.append("siteName", siteName);
    formData.append("logo", logo);
    editInfo(formData).then((data) => {
      setShowInfo(true);
      setTimeout(() => setShowInfo(false), 2000);
    });
  };

  return (
    <Container
      style={{ minHeight: window.innerHeight - 232 }}
      className="d-flex admin-page flex-column"
    >
      <div>
        <Button
          variant="outline-dark"
          className="mt-2 w-50"
          onClick={() => setCategoryVisible(true)}
        >
          Додати категорiю
        </Button>
        <Button
          variant="outline-dark"
          className="mt-2 w-50"
          onClick={() => setDelCategoryVisible(true)}
        >
          Редагувати категорiю
        </Button>
      </div>

      <div>
        <Button
          variant="outline-dark"
          className="mt-2 w-50"
          onClick={() => setSectionVisible(true)}
        >
          Додати роздiл до категорії
        </Button>
        <Button
          variant="outline-dark"
          className="mt-2 w-50"
          onClick={() => setDelSectionVisible(true)}
        >
          Редагувати роздiл в категорії
        </Button>
      </div>
      <div>
        <Button
          variant="outline-dark"
          className="mt-2 w-100"
          onClick={() => setDeviceVisible(true)}
        >
          Додати товар
        </Button>
      </div>
      <div>
        <Button
          variant="outline-dark"
          className="mt-2 w-50"
          onClick={() => setSlideVisible(true)}
        >
          Додати Slide
        </Button>
        <Button
          variant="outline-dark"
          className="mt-2 w-50"
          onClick={() => setEditSlideShowVisible(true)}
        >
          Редагувати SlideShow
        </Button>
      </div>

      <div>
        <Button
          variant="outline-dark"
          className="mt-2 w-50"
          onClick={() => setArticleVisible(true)}
        >
          Додати Статтю
        </Button>
        <Button
          variant="outline-dark"
          className="mt-2 w-50"
          onClick={() => setEditArticleVisible(true)}
        >
          Редагувати Статтю
        </Button>
      </div>
      <div className="border rounded p-2 my-5">
        <div className="text-center fw-bold">INFO</div>
        <Form>
          <div className="mt-4 w-25 d-inline-block ">Назва сайту</div>
          <Form.Control
            className="my-3 d-inline-block w-75"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder={"Введіть назву сайту"}
          />
          <div className="mt-4 w-25 d-inline-block ">Виберiть лого сайту</div>
          <Form.Control
            className="my-3 d-inline-block w-75"
            type="file"
            onChange={selectFile}
          />
        </Form>
        <div>
          <Button
            className="mt-2 w-50"
            variant="outline-dark"
            onClick={() => navigate(SHOP_ROUTE)}
          >
            Вийти
          </Button>
          <Button
            className="mt-2 w-50"
            variant="outline-dark"
            onClick={changeInfo}
          >
            Змiнити INFO
          </Button>
        </div>
      </div>
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <CreateCategory
        show={categoryVisible}
        onHide={() => setCategoryVisible(false)}
      />
      <EditCategory
        show={delCategoryVisible}
        onHide={() => setDelCategoryVisible(false)}
      />
      <CreateSection
        show={sectionVisible}
        onHide={() => setSectionVisible(false)}
      />
      <EditSection
        show={delSectionVisible}
        onHide={() => setDelSectionVisible(false)}
      />
      <CreateSlide show={slideVisible} onHide={() => setSlideVisible(false)} />
      <EditSlideShow
        show={editSlideShowVisible}
        onHide={() => setEditSlideShowVisible(false)}
      />
      <CreateArticle
        show={articleVisible}
        onHide={() => setArticleVisible(false)}
      />
      <EditArticle
        show={editArticleVisible}
        onHide={() => setEditArticleVisible(false)}
      />
      <ModalInfo
        info={`Info успішно змiнена! `}
        color="text-success"
        show={showInfo}
      />
    </Container>
  );
});

export default Admin;
