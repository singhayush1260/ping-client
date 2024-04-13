import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { User } from "@/types";
import MapPopupCard from "./MapPopupCard";
import Modal from "../modals/Modal";
import { Button } from "../ui/button";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const zoomControlOptions = {
  position: "topright",
};

interface MapProps {
  currentUser: User;
  users?: User[];
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map = ({ currentUser, users }: MapProps) => {

  let currentUserCenter: L.LatLngExpression = [22, 77]; // Default center

  if (currentUser?.location?.center.length === 2 && !users) {
    currentUserCenter = currentUser.location.center as L.LatLngExpression;
  }

  let body: JSX.Element[] | JSX.Element = [];

  if (currentUser && !users) {
    const customIcon = L.divIcon({
      className: "custom-div-icon",
      html: `<div class="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-full shadow-md" style="background-image: url('${currentUser.profilePicture}'); background-size: cover;"></div>`,
      iconSize: [20, 20],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    body = (
      <Marker
        key={currentUser._id}
        position={currentUserCenter}
        icon={customIcon}
      >
        <Popup>
          <h1>You</h1>
          {currentUser.location?.name}
        </Popup>
      </Marker>
    );
  }

  if (users) {
    body = users.map((user) => {
      const customIcon = L.divIcon({
        className: "custom-div-icon",
        html: `<div class="w-10 h-10 flex justify-center items-center bg-blue-500 rounded-full shadow-md" style="background-image: url('${user.profilePicture}'); background-size: cover;"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
      });

      const userLocationCenter = user?.location?.center?.length === 2
        ? user.location.center as L.LatLngExpression
        : currentUserCenter;

      return (
        <Marker
          key={user._id}
          position={userLocationCenter}
          icon={customIcon}
        >
          <Popup>
           <h1 className="mx-auto">{user.name}</h1>
          <Modal trigger={<Button>View Profile</Button>}><MapPopupCard user={user}/></Modal>
          </Popup>
          
        </Marker>
      );
    });
  }

  return (
    <MapContainer
      key={currentUser?.location?.center ? `${currentUser?.location?.center[0]}_${currentUser?.location?.center}` : "default"}
      center={currentUserCenter}
      zoom={2}
      scrollWheelZoom={false}
      zoomControl={false} // Disable default zoom control
      className="h-full rounded-lg"
    >
      <TileLayer url={url} attribution={attribution} /> 
      {/* @ts-ignore */}
      <ZoomControl position={zoomControlOptions.position} />
      {body}
    </MapContainer>
  );
};

export default Map;
