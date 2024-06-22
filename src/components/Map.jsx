import { useNavigate } from "react-router-dom"
import styles from "./Map.module.css"
import { useCities } from "../context/CitiesContext";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import Button from "./Button";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
    const { cities } = useCities()
    const [mapPosition, setMapPosition] = useState([40, 0])
    const [lat, lng] = useUrlPosition()
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();
    useEffect(
        function () {
            if (lat && lng) return setMapPosition([lat, lng])
        },
        [lat, lng]
    )
    useEffect(
        function () {
            if (geolocationPosition)
                setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
        },
        [geolocationPosition]
    );
    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use your position"}
                </Button>
            )}
            <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className="h-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker position={[city.position.lat , city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span>:<span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}
function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position)
    return null;
}
function DetectClick() {
    const { isOpenSideBar } = useCities()
    const navigate = useNavigate();
    useMapEvent({
        click: e => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
            isOpenSideBar(true);
        }
    });
    return null;

}
export default Map
