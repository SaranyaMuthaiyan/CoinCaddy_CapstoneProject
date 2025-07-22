import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">About CoinCaddy</h1>

        <p className="text-lg mb-4">
          <strong>CoinCaddy</strong> is your personal financial companion—designed to simplify money management, track expenses, and visualize financial health effortlessly.
        </p>

        <div className="text-md mb-4">
          Built with ❤️ using the <span className="font-semibold">MERN stack</span>, CoinCaddy helps users:
          <ul className="list-disc list-inside mt-2 ml-4">
            <li>Log income and expenses intuitively</li>
            <li>Track spending habits with dynamic charts</li>
            <li>Understand cash flow and savings potential</li>
            <li>Get actionable insights from visual breakdowns</li>
          </ul>
        </div>

        <p className="text-md mb-4">
          Whether you're budgeting for travel 💸, cutting down debt, or just trying to save smarter—CoinCaddy blends powerful tools with a sleek, user-centric interface.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Meet the Creator</h2>
          <p className="text-md">
            This app was crafted by Saranya Muthaiyan 👩🏽‍💻👋,a passionate developer with a keen eye for design and a commitment to empowering people through tech. Every chart, button, and component was built with care to make financial tracking feel less like a chore—and more like a superpower. ⚡
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="italic text-sm text-gray-500">“Finance is not about money. It’s about having options.” — Chris Rock</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;