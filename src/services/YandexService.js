export default class YandexService {
  static async getGeodata(value, sendCoords) {
    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=3afed941-d5a1-4cbf-a362-ae46cebed684&format=json&geocode=${value}&sco=latlong`
      );
      if (!response.ok) {
        throw new Error(
          `Что-то пошло не так... статус ответа: ${response.status}`
        );
      }
      const result = await response.json();

      if (sendCoords) {
        return result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          .split(" ")
          .map((item) => parseFloat(item));
      }
      return result.response.GeoObjectCollection.featureMember[0].GeoObject
        .metaDataProperty.GeocoderMetaData.Address.formatted;
    } catch (err) {
      console.log(err);
    }
  }
}
