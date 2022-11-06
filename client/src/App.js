import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

// COMPONENTS
import TopArtists from './components/TopArtists';
import TopTracks from './components/TopTracks';
import Playlist from './components/Playlist';
import Playlists from './components/Playlists';
import HomePage from './components/HomePage';

// SPOTIFY
import { accessToken, getCurrentUserProfile } from './spotify';

// UTILS
import { catchErrors } from './utils';

// STYLED
import styled from 'styled-components/macro';
import { GlobalStyle } from './styles';

const StyledLoginButton = styled.a`
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  margin: 20px;
  border-radius: 30px;
  display: inline-block;
`;

function App() {

  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  console.log(profile, "PROFILE IN APP")
  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  // Scroll to top of page when changing routes
  // https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <div className="App">
      <GlobalStyle />

      <header className="App-header">
      {!token ? (
          <StyledLoginButton className="App-link" href="http://localhost:8888/login">
            Log in to Spotify
          </StyledLoginButton>
        ) : (
          <BrowserRouter>
            <ScrollToTop />

            <Routes>
              <Route 
                path="/top-artists"
                element={<TopArtists />}
                >
              </Route>
              <Route
                path="/top-tracks"
                element={<TopTracks />}
                >
              </Route>
              <Route 
                path="/playlists/:id"
                element={<Playlist />}
                >
              </Route>
              <Route
                path="/playlists"
                element={<Playlists />}
              >
              </Route>
              <Route
                path="/"
                element={<HomePage profile={profile} />}
                >
              </Route>
            </Routes>
          </BrowserRouter>
        )}
      </header>
    </div>
  );
}

export default App;
