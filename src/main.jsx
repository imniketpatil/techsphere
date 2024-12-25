import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SongSection from "./components/SongSection.jsx";
import TopTracks from "./components/TopTracksList.jsx";
import Favourites from "./components/FavouritesList.jsx";
import RecentlyPlayed from "./components/RecentlyPlayedList.jsx";
import ForYouList from "./components/ForYouList.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ForYouList />,
      },
      {
        path: "/TopTracks",
        element: <TopTracks />,
      },
      {
        path: "/Favourites",
        element: <Favourites />,
      },
      {
        path: "/RecentlyPlayed",
        element: <RecentlyPlayed />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
