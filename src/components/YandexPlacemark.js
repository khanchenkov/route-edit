import React, { useRef } from "react";
import { Placemark } from "@pbe/react-yandex-maps";
import YandexService from "../services/YandexService";

const YandexPlacemark = ({ routePoint, setRoutePoints, idx }) => {
  const placemarkObj = useRef(null);

  const updateOnDrag = async (newCoords) => {
    const address = await YandexService.getGeodata(newCoords, false);
    setRoutePoints((state) => {
      return state.map((item) => {
        if (item.id === routePoint.id) {
          return {
            id: item.id,
            order: item.order,
            pointName: address,
            pointPos: newCoords,
          };
        }
        return item;
      });
    });
  };

  return (
    <Placemark
      geometry={routePoint.pointPos}
      properties={{
        balloonContent: `<div>${routePoint.pointName}</div>`,
        iconContent: `${idx + 1}`,
      }}
      options={{
        draggable: true,
      }}
      instanceRef={placemarkObj}
      onDragEnd={() => updateOnDrag(placemarkObj.current.geometry._coordinates)}
    />
  );
};

export default YandexPlacemark;
