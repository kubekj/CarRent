import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/carCardComponent.css";
import "../styles/howitworks.css";
import "../styles/navbar.css";
import "../styles/cars.css";
import "../styles/login.css";
import "../styles/registration.css";
import "../styles/cardetails.css";
import "../styles/rental.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/rentCardComponent.css";
import "../styles/rents.css";
import "../styles/rentDetails.css";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
