import Layout from "../components/Layout.jsx"
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout tittle={"Contact us"}>
    <div className="row contactus ">
      <div className="col-md-6 ">
        <img
          src="https://www.pinterest.com/pin/373095150396836228/"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
        <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
        <p className="text-justify mt-2">
          any query and info about prodduct feel free to call anytime we 24X7
          vaialible
        </p>
        <p className="mt-3">
          <BiMailSend /> : www.damianorina.com
        </p>
        <p className="mt-3">
          <BiPhoneCall /> : +254703449305
        </p>
        <p className="mt-3">
          <BiSupport /> : 1800-0000-0000 (toll free)
        </p>
      </div>
    </div>
  </Layout>
  )
}

export default Contact
