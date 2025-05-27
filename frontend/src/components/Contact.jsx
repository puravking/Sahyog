import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Instagram, Twitter, Linkedin, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
    const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("Sending...");

    emailjs
      .sendForm(
        "service_y94v2uu",    // replace with your service ID
        "template_h0jkeak",   // replace with your template ID
        formRef.current,
        "zSvmXUXMY4u1A7O2vqbPn"     // replace with your public key
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          formRef.current?.reset();
        },
        () => {
          setStatus("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold text-green-800 mb-6">Contact Me</h2>

      {/* Social Links */}
      <div className="flex justify-center gap-6 text-green-700 mb-8">
        <a href="https://www.instagram.com/pu_rav123/" target="_blank" rel="noopener noreferrer">
          <Instagram className="hover:text-green-900" />
        </a>
        <a href="https://x.com/puravking" target="_blank" rel="noopener noreferrer">
          <Twitter className="hover:text-green-900" />
        </a>
        <a href="https://www.linkedin.com/in/purav-5641b7254/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="hover:text-green-900" />
        </a>
        <a href="https://github.com/puravking" target="_blank" rel="noopener noreferrer">
          <Github className="hover:text-green-900" />
        </a>
      </div>

      {/* Contact Form */}
      <form ref={formRef} onSubmit={sendEmail} className="bg-green-50 p-6 rounded-xl shadow-lg space-y-4 max-w-lg mx-auto">
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="email"
          name="reply_to"
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          required
          className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md shadow-md"
        >
          Send Message
        </button>
        {status && <p className="mt-2 text-sm text-green-800">{status}</p>}
      </form>
      <button
  onClick={() => navigate("/")}
  className="cursor-pointer mt-10 mx-auto block bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300 ease-in-out"
>
  ← Back to Home
</button>
    </div>
  );
}
