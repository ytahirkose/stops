import Routes from './routes/Routes';
import './App.scss';
import { ErrorBoundary } from "./components";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ErrorBoundary>
      <ToastContainer
        limit={2}
        autoClose={2000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        containerId="vf-toast-container"
        position="top-center"
      />
      {Routes}
    </ErrorBoundary>
  );
}

export default App;
