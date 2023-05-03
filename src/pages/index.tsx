import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar/>
      <main>
        <section>
          <div className="bg-gray-100 sm:grid grid-rows-2 px-4 py-6 min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">
            <div className="h-5/6 col-span-4 bg-gradient-to-tr from-indigo-800 to-indigo-500 rounded-md flex items-center">
              <div className="ml-20 w-80">
                <h2 className="text-white text-4xl">Adsla</h2>
                <p className="text-indigo-100 mt-4 capitalize font-thin tracking-wider leading-7">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
                  dolore?
                </p>

                <a
                  href="#"
                  className="uppercase inline-block mt-8 text-sm bg-white py-2 px-4 rounded font-semibold hover:bg-indigo-100"
                >
                  get start
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
