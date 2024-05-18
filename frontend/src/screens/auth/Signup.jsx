import React, { useState } from "react";
import InputField from "../../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isjournalist, setisjournalist] = useState(false);
  const handleChange = (e) => {
    console.log("Checked Value", e.target.checked);
    if (e.target.checked) {
      e.target.value = e.target.checked;
    }
    const { name, value, type, checked } = e.target;
    console.log("Name", name, "Value", value, "FormData", formData);

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("IsJournalList in Signup",isjournalist)
    e.preventDefault();
    const data = {
      ...formData,
      isjournalist: isjournalist,
    };
    console.log({data});
   await axios.post("http://localhost:4000/signup",{
    name:data.name,
    email:data.email,
    password:data.password,
    isjournalist:data.isjournalist
   }).then((response) => {
      if(response.data) {
        console.log("Response",response.data);
        navigate("/");
      }
   }).catch((error) => {
    console.log("SingUp Erro",error);
   })

   
  };

  return (
    <div>
      <div>
        <section className="md:h-screen md:py-36 flex items-center bg-[url('../../assets/images/cta.html')] bg-no-repeat bg-center bg-cover">
          <div className=" absolute inset-0 bg-slate-950" />
          <div className="container relative">
            <div className="flex justify-center">
              <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
                <a href="index.html">
                  <img
                    src="assets/images/logo-icon-64.png"
                    className="mx-auto"
                    alt
                  />
                </a>
                <h5 className="my-6 text-xl font-semibold">Signup</h5>
                <form onSubmit={handleSubmit} className="text-start">
                  <div className="grid grid-cols-1">
                    <InputField
                      htmlForName={"RegisterName"}
                      type={"text"}
                      placeholder={"Harry"}
                      item={"Your Name:"}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <InputField
                      htmlForName={"LoginEmail"}
                      type={"email"}
                      placeholder={"name@example.com"}
                      item={"Email Address:"}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <InputField
                      htmlForName={"LoginPassword"}
                      type={"password"}
                      placeholder={"Password:"}
                      item={"Password:"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div className="flex gap-1">
                      <input
                        className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 me-2"
                        type="checkbox"
                        id="AcceptT&C"
                        name="isJournalist"
                        onClick={(e) => {
                          setisjournalist(e.target.checked);
                        }}
                      />
                      <label
                        className="form-check-label text-slate-400"
                        htmlFor="AcceptT&C"
                        style={{ marginLeft: "5px" }}
                      >
                        Are you Journalist?
                      </label>
                    </div>
                    <div className="mb-4">
                      <input
                        type="submit"
                        className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full"
                        defaultValue="Register"
                      />
                    </div>
                    <div className="text-center">
                      <span className="text-slate-400 me-2">
                        Already have an account ?{" "}
                      </span>{" "}
                      <Link
                        to="/login"
                        className="text-black dark:text-white font-bold inline-block"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/*end section */}
      </div>
    </div>
  );
}

export default Signup;
