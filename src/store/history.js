import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

const history = createBrowserHistory();

history.listen((location) => {
  const pathname = location.pathname.split("/");
  if (pathname.length >= 2) {
    ReactGA.pageview(pathname[1]);
  }
})

export default history;
