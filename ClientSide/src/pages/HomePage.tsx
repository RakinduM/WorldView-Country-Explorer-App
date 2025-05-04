import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GlobeIcon, SearchIcon, MapIcon, BookmarkIcon } from "lucide-react";

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 w-full">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center text-white"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1651421479704-470a78eef530?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80">
          <div className="container mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                className="md:w-1/2 mb-10 md:mb-0"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Explore Our Beautiful World
                </h1>
                <p className="text-xl mb-8 text-gray-300">
                  Discover countries, cultures, and facts from around the globe.
                  Create an account to bookmark your favorite places.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    to="/countries"
                    className="bg-gray-100 text-gray-900 px-6 py-3 rounded-full font-medium text-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <SearchIcon size={20} className="mr-2" />
                    Explore Countries
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-transparent border-2 border-gray-100 px-6 py-3 rounded-full font-medium text-lg hover:bg-gray-100/10 transition-colors flex items-center justify-center"
                  >
                    Sign Up Free
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              Discover the World at Your Fingertips
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              WorldExplorer provides you with comprehensive information about
              countries around the globe.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-700 rounded-xl p-8 shadow-lg"
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
            >
              <div className="bg-blue-900 text-blue-400 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <SearchIcon size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">
                Search Countries
              </h3>
              <p className="text-gray-400">
                Find detailed information about any country in the world with
                our powerful search functionality.
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-700 rounded-xl p-8 shadow-lg"
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
            >
              <div className="bg-green-900 text-green-400 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <MapIcon size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">
                Explore Details
              </h3>
              <p className="text-gray-400">
                Discover capitals, populations, languages, currencies, and more
                about each country.
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-700 rounded-xl p-8 shadow-lg"
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
            >
              <div className="bg-purple-900 text-purple-400 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BookmarkIcon size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">
                Save Favorites
              </h3>
              <p className="text-gray-400">
                Create an account to bookmark your favorite countries and build
                your own travel wishlist.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{
              once: true,
            }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Explore the World?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-400">
              Join thousands of users discovering new countries and cultures
              every day.
            </p>
            <Link
              to="/countries"
              className="bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors inline-flex items-center"
            >
              <GlobeIcon size={20} className="mr-2" />
              Start Exploring
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};