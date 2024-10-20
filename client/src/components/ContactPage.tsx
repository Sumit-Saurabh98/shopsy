import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

interface ContactInfo {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", contactInfo);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16 text-center">
        <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
        <h1 className="mb-4 text-4xl font-bold text-emerald-400">Contact Us</h1>
        <p className="mx-auto max-w-2xl text-gray-400">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
        </motion.div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="mb-6 text-2xl font-bold text-gray-200">Get in Touch</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 p-4">
                <Mail className="text-emerald-400" />
                <div>
                  <h3 className="font-semibold text-gray-300">Email</h3>
                  <p className="text-gray-600">contact@sumitsaurabh.dev</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 p-4">
                <Phone className="text-emerald-400" />
                <div>
                  <h3 className="font-semibold text-gray-300">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 p-4">
                <MapPin className="text-emerald-400" />
                <div>
                  <h3 className="font-semibold text-gray-300">Address</h3>
                  <p className="text-gray-600">
                    123 Fashion Street, Luxury Avenue
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="mb-6 text-2xl font-bold text-gray-200">Send us a Message</h2>
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleChange}
                  className=" block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gary-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleChange}
                  className=" block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gary-300">
                  Message
                </label>
                <textarea
                  name="message"
                  value={contactInfo.message}
                  onChange={handleChange}
                  rows={4}
                  className=" block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
							 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
              >
                Send Message
                <Send size={16} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
