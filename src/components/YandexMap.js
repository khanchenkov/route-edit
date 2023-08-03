import React, { useMemo, useState, useEffect } from "react";
import { YMaps, Map, Polyline } from "@pbe/react-yandex-maps";
import YandexPlacemark from "./YandexPlacemark";

const YandexMap = ({ routePoints, setRoutePoints }) => {
  const [center, setCenter] = useState([]);
  const mapState = useMemo(() => ({ center, zoom: 9 }), [center]);

  useEffect(() => {
    if (!!routePoints.length) {
      setCenter(routePoints[routePoints.length - 1].pointPos);
    } else {
      setCenter([55.755864, 37.617698]);
    }
  }, [routePoints]);

  return (
    <YMaps
      query={{
        apikey: process.env.REACT_APP_API_KEY,
        lang: "ru_RU",
      }}
    >
      <Map
        state={mapState}
        width={400}
        height={350}
        modules={["geoObject.addon.balloon"]}
      >
        {routePoints.map((item, idx) => (
          <YandexPlacemark
            idx={idx}
            routePoint={item}
            key={item.id}
            setRoutePoints={setRoutePoints}
          />
        ))}
        <Polyline
          geometry={[...routePoints.map((item) => item.pointPos)]}
          options={{
            balloonCloseButton: false,
            strokeColor: "#1E98FF",
            strokeWidth: 4,
            strokeOpacity: 1,
          }}
        />
      </Map>
    </YMaps>
  );
};

export default YandexMap;
