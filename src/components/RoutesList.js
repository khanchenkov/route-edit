import React, { useState } from "react";
import styled from "styled-components";

const RoutePointsList = styled.ul`
  list-style: none;
  width: 275px;
  font-size: 18px;
  border-radius: 12px;
  border: 0;
  padding: 0;
  color: #3f455f;
  position: relative;
`;
const RoutePoint = styled.li`
  padding: 10px 10px;
  width: 275px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 16px;
  border: 1px solid #ebebeb;
  background: #ffffff;
  cursor: grab;
  margin-bottom: 15px;
  p {
    margin: 0;
    line-height: 1.5;
  }
  button {
    margin-left: auto;
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
`;

const RoutesList = ({ routePoints, setRoutePoints }) => {
  const removeRoutePoint = (id) => {
    setRoutePoints((state) => state.filter((item) => item.id !== id));
  };

  const [draggedRoute, setDraggedRoute] = useState(null);
  const [draggedOverRoute, setDraggedOverRoute] = useState(null);

  const handleDragSort = () => {
    let tmpList = [...routePoints];
    const draggedItemObj = tmpList.splice(draggedRoute, 1)[0];
    tmpList.splice(draggedOverRoute, 0, draggedItemObj);

    setDraggedRoute(null);
    setDraggedOverRoute(null);

    setRoutePoints(tmpList);
  };

  return (
    <RoutePointsList>
      {routePoints.map(({ id, pointName }, idx) => (
        <RoutePoint
          key={id}
          draggable
          onDragStart={() => setDraggedRoute(idx)}
          onDragEnter={() => setDraggedOverRoute(idx)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnd={handleDragSort}
        >
          <p>{pointName}</p>
          <button onClick={() => removeRoutePoint(id)}>&#10060;</button>
        </RoutePoint>
      ))}
    </RoutePointsList>
  );
};

export default RoutesList;
