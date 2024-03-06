import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./routes/ErrorPage";
import Calculator from "./routes/Calculator";
import Peregrino from "./routes/spotify/Peregrino";
import SpotifyAboutAlessandro from "./routes/spotify/SpotifyAboutAlessandro";
import Umacoisa from "./routes/spotify/UmaCoisa";
import SpotifyAboutMorada from "./routes/spotify/SpotifyAboutMorada";
import Phone from "./routes/phone/Phone";
import PhoneVoicemail from "./routes/phone/PhoneVoicemail";
import PhoneContacts from "./routes/phone/PhoneContacts";
import PhoneRecents from "./routes/phone/PhoneRecents";
import PhoneFavourites from "./routes/phone/PhoneFavourites";
import GoogleMaps from "./routes/GoogleMaps";
import NotesPage from "./routes/NotesPage";
import Feedback from "./routes/Feedback";
import FeedbackAdd from "./components/feedback/FeedbackAdd";
import FeedbackStatistics from "./components/feedback/FeedbackStatistics";
import Stocks from "./routes/Stocks";
import Settings from "./routes/Settings";
import Weather from "./routes/Weather.jsx";
import MemoryGame from "./routes/MemoryGame";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Calculator",
    element: <Calculator />,
  },
  {
    path: "/Spotify/Peregrino",
    element: <Peregrino />,
  },
  {
    path: "/Spotify/Alessandro-Vilas-Boas",
    element: <SpotifyAboutAlessandro />,
  },
  {
    path: "/Spotify/uma-coisa",
    element: <Umacoisa />,
  },
  {
    path: "/Spotify/MORADA",
    element: <SpotifyAboutMorada />,
  },
  {
    path: "/phone",
    element: <Phone />,
  },
  {
    path: "/phone/voicemail",
    element: <PhoneVoicemail />,
  },
  {
    path: "/phone/contacts",
    element: <PhoneContacts />,
  },
  {
    path: "/phone/recents",
    element: <PhoneRecents />,
  },
  {
    path: "/phone/favourites",
    element: <PhoneFavourites />,
  },
  {
    path: "/google-maps",
    element: <GoogleMaps />,
  },
  {
    path: "/Notes",
    element: <NotesPage />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  },
  {
    path: "/thanks-for-your-feedback",
    element: <FeedbackAdd />,
  },
  {
    path: "/statistics",
    element: <FeedbackStatistics />,
  },
  {
    path: "/stocks",
    element: <Stocks />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/weather",
    element: <Weather />,
  },
  {
    path: "/Memory-game",
    element: <MemoryGame />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
