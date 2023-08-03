import React, { useState } from "react";
import styled from "styled-components";
import YandexMap from "./YandexMap";
import RoutesList from "./RoutesList";
import YandexService from "../services/YandexService";
import { v4 as uuidv4 } from "uuid";

const AppWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 700px;
  margin: 30px auto;
`;
const AddNewItemWrapper = styled.div`
  width: 275px;
  position: relative;
  display: flex;
  align-items: center;
`;
const AddNewitemInput = styled.input`
  font-size: 16px;
  border: 0;
  border-radius: 5px;
  padding: 12px 60px 12px 18px;
  background: #f3f5fc;
`;
const AddNewItemBtn = styled.button`
  position: absolute;
  right: 0;
  height: 100%;
  padding: 0 13px;
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: 18px;
`;

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [routePoints, setRoutePoints] = useState([
    {
      id: "ec4f6f58-736a-44cb-8d9a-9e6c72a5cb43",
      pointName: "Москва, метро домодедовская",
      pointPos: [55.610845, 37.718669],
    },
    {
      id: "2d3209a5-c8be-45a3-934d-ab886ba57540",
      pointName: "Спб",
      pointPos: [59.938955, 30.315644],
    },
    {
      id: "12c8f456-a176-4dd3-8fdc-ed9b03e3b696",
      pointName: "Минск, ул. Мирошниченко, 51",
      pointPos: [53.961784, 27.615703],
    },
    {
      id: "483c9aef-dd10-4602-8d8d-aa70179e7648",
      pointName: "Москва",
      pointPos: [55.755864, 37.617698],
    },
  ]);

  const inputHandler = (e) => {
    if (e.key === "Enter") {
      addRoutePoint();
    }
  };
  const addRoutePoint = async () => {
    if (inputValue.length) {
      const [lat, long] = await YandexService.getGeodata(inputValue, true);

      setRoutePoints((state) => [
        ...state,
        {
          id: uuidv4(),
          pointName: inputValue,
          pointPos: [long, lat],
        },
      ]);
      setInputValue("");
    }
  };

  return (
    <AppWrapper>
      <div>
        <AddNewItemWrapper>
          <AddNewitemInput
            type="text"
            onKeyDown={(e) => inputHandler(e)}
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            placeholder={"Например, Спас-Деменск"}
            data-testid="search-input"
          />
          <AddNewItemBtn onClick={addRoutePoint}>&#10133;</AddNewItemBtn>
        </AddNewItemWrapper>
        <RoutesList routePoints={routePoints} setRoutePoints={setRoutePoints} />
      </div>
      <YandexMap routePoints={routePoints} setRoutePoints={setRoutePoints} />
    </AppWrapper>
  );
};

export default App;
