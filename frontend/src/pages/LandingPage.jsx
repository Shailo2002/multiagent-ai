import React from "react";
import Navbar from "../components/Navbar.jsx";
import Chatbox from "../components/Chatbox.jsx";

function LandingPage() {
  return (
    <main className="w-full">
      <Navbar />

      <section className="flex min-h-screen flex-col pt-16">
        <div className="flex flex-1 items-center justify-center">
          <Chatbox />
        </div>
      </section>

      <section className="min-h-screen w-full">Extra component</section>
    </main>
  );
}

export default LandingPage;
