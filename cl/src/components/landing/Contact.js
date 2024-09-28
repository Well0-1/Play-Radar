import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const serviceId = process.env.REACT_APP_SERVICE_ID;
  const templateId = process.env.REACT_APP_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;

  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const templateParams = {
      name: formData.name,
      mail: formData.mail,
      message: formData.message,
    };

    emailjs
      .send("service_n0gay4w", "template_f25329h", templateParams, publicKey)
      .then(
        () => {
          console.log("SUCCESS!");
          setSubmitted(true);
        },
        (error) => {
          console.log("FAILED...", error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative size-full bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f4e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f4e_1px,transparent_1px)] bg-[size:22px_26px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        {!submitted ? (
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold text-white text-center">Contact Us</h1>
            <p className="text-slate-300 mt-4 text-center max-w-2xl mx-auto">
              Have any questions or feedback? Feel free to get in touch with us by filling out the
              form below.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 max-w-2xl w-full space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg"
            >
              <div className="flex flex-col space-y-2">
                <label className="text-slate-300 text-sm font-semibold" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring focus:ring-blue-500 focus:outline-none"
                  placeholder="Your Name"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-slate-300 text-sm font-semibold" htmlFor="mail">
                  Your Email
                </label>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring focus:ring-blue-500 focus:outline-none"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-slate-300 text-sm font-semibold" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring focus:ring-blue-500 focus:outline-none"
                  rows="5"
                  autoComplete="off"
                  placeholder="Write your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full p-3 ${
                  loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                } text-white font-semibold rounded-md transition duration-300 ease-in-out`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-8">
            <div className="flex flex-col items-center bg-green-500 text-white p-6 space-y-3 rounded-md shadow-lg">
              <FontAwesomeIcon icon={faCircleCheck} className="text-4xl" />
              <h2 className="text-lg font-semibold">Thank You!</h2>
              <p>Your message has been successfully submitted. We will get back to you shortly.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
