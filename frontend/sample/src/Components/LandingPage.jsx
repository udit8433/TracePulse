
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

import Hyperspeed from "./Hyperspeed";

const features = [
  {
    icon: "⚡",
    title: "Real-time Monitoring",
    description:
      "Monitor your APIs automatically and detect downtime before your users notice.",
  },
  {
    icon: "📊",
    title: "Response Time Analytics",
    description:
      "Track API response times and analyze performance with historical data.",
  },
  {
    icon: "🔔",
    title: "Instant Alerts",
    description:
      "Stay informed whenever your APIs become unavailable or experience failures.",
  },
  {
    icon: "📈",
    title: "Uptime History",
    description:
      "View uptime percentages, request history and API health trends.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070B18] text-white overflow-hidden relative">

      {/* Animated Background */}
     
         <div className="fixed inset-0 z-0">
        <Hyperspeed />
      </div>


      {/* Navbar */}
     <Navbar></Navbar>

     <div className="h-15"></div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20
  flex flex-col items-center gap-16">

     <div className="animate-appear flex flex-col items-center text-center">

  <div className="inline-flex items-center gap-2 px-4 py-2
    rounded-full border border-cyan-400/30 bg-cyan-400/10
    text-cyan-300 text-sm mb-7">
    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
    Intelligent API Monitoring Platform
  </div>

  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
    Your APIs.
    <br />
    <span className="bg-gradient-to-r from-cyan-400
      via-blue-500 to-indigo-400 bg-clip-text text-transparent">
      Always Under Control.
    </span>
  </h1>

  <p className="text-gray-400 text-lg leading-relaxed
    mt-7 max-w-xl">
    Monitor API uptime, track response times, detect failures
    and keep your services running smoothly with TracePulse.
  </p>

  <div className="flex flex-wrap justify-center gap-4 mt-9">

   

   

  </div>

  <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-gray-400">
    <div>
      <p className="text-3xl font-bold text-white relative top-[20px]">24/7</p>
      <p className="relative top-[20px]" >Monitoring</p>
    </div>
    <div>
      <p className="text-3xl font-bold text-white relative top-[20px]">Real-time</p>
      <p className="relative top-[20px]">Health Checks</p>
    </div>
    <div>
      <p className="text-3xl font-bold text-white relative top-[20px]">Instant</p>
      <p className="relative top-[20px]">Detection</p>
    </div>
  </div>

</div>

 <p className=" text-[18px] text-white-400 mt-5 max-w-2xl mx-auto leading-relaxed relative top-[20px]">
      One platform to monitor, analyze and maintain the health
      of all your APIs.
    </p>

        {/* Dashboard Preview */}
       <div className="relative animate-float3 w-full max-w-4xl mx-auto">

  <div className="absolute inset-0 bg-blue-500/20 blur-[90px]" />

  <div className="relative w-full h-[350px] rounded-2xl border border-white/15
    bg-[#10182B]/90 backdrop-blur-xl p-8 shadow-2xl
    shadow-blue-900/30">

            <div className="flex justify-between items-center mb-7">
              <div>
                <p className="text-gray-400 text-sm">API Overview</p>
                <h2 className="text-xl font-bold mt-1">System Health</h2>
              </div>

              <span className="text-green-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
                Operational
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-gray-400 text-sm">Uptime</p>
                <p className="text-3xl font-bold text-green-400 mt-2">99.9%</p>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                <p className="text-gray-400 text-sm">Avg Response</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">120ms</p>
              </div>

            </div>

            <div className="mt-6 bg-white/5 rounded-xl p-5 border border-white/10">
              <p className="font-semibold mb-5">API Status</p>

              {["Authentication API", "Payment API", "User API"].map(
                (api) => (
                  <div key={api}
                    className="flex justify-between items-center py-3
                    border-b border-white/10 last:border-0">

                    <span className="text-gray-300 text-sm">{api}</span>

                    <span className="text-green-400 text-sm">
                      ● Healthy
                    </span>
                  </div>
                )
              )}
            </div>

            <div className="mt-6 w-full overflow-hidden">

  <div className="flex justify-between items-center mb-3">
    <p className="text-sm text-gray-400">Response Time</p>
    <p className="text-sm text-cyan-400">Live Preview</p>
  </div>

  <div className="w-full overflow-hidden">
    <svg
      viewBox="0 0 400 100"
      preserveAspectRatio="none"
      className="block w-full h-[100px]"
    >
      <defs>
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4"/>
          <stop offset="100%" stopColor="#2563eb"/>
        </linearGradient>
      </defs>

      <path
        d="M0 65 L35 65 L55 45 L75 75 L100 20
        L125 65 L160 65 L185 48 L210 70
        L240 35 L265 65 L300 65 L325 50
        L345 70 L370 40 L400 55"
        fill="none"
        stroke="url(#pulseGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pulse-line"
      />
    </svg>
  </div>
</div>
        </div>
        
    </div>


      </section>

<div className="h-24"></div>


      {/* Features */}
     <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">

  {/* Features Heading */}
  <div className="text-center">

    <p className=" text-[42px] text-cyan-400 font-semibold tracking-widest  relative top-[5px]">
      POWERFUL FEATURES
    </p>

    <h2 className="text-[22px]  font-bold mt-4">
      Everything your APIs need.
    </h2>

    

  </div>

  {/* Feature Cards */}
 <div className="grid grid-cols-2 gap-x-4 gap-y-4 relative top-[18px] relative left-[100px]">

    {features.map((feature, index) => (
      <div
        key={feature.title}
        style={{ animationDelay: `${index * 150}ms` }}
        className="animate-appear group p-7 rounded-2xl
        bg-white/[0.04] border border-white/10
        hover:border-cyan-400/50 hover:bg-blue-500/10
        transition duration-300 hover:-translate-y-2 h-[220px] w-[350px]"
      >

        <div className="text-4xl mb-6 group-hover:scale-110 transition">
          {feature.icon}
        </div>

        <h3 className="text-xl font-bold mb-3">
          {feature.title}
        </h3>

        <p className="text-gray-400 leading-relaxed text-sm">
          {feature.description}
        </p>

      </div>
    ))}

  </div>

</section>

<div className="h-25"></div>



      {/* How it works */}
    <section id="how-it-works" className="relative z-10 pt-40 pb-24 px-6
"
>

        <div className="max-w-7xl mx-auto text-center mt-8">

          <p className=" text-[42px] text-cyan-400 font-semibold tracking-widest ">
            SIMPLE WORKFLOW
          </p>

          <h2 className="text-[22px] font-bold mt-4">
            How TracePulse Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16">

            {[
              ["01", "Add Your API", "Register your API endpoint and configure monitoring."],
              ["02", "Automated Checks", "Our monitoring system periodically checks your API health."],
              ["03", "Track & Analyze", "View response times, uptime history and failures."],
            ].map(([number, title, description]) => (
              <div key={number}>
                <div className="w-16 h-16 mx-auto rounded-2xl
                  bg-blue-600/20 border border-blue-400/30
                  flex items-center justify-center text-2xl
                  font-bold text-cyan-400 relative left-[160px] relative top-[8px]">
                  {number}
                </div>

                <h3 className="text-xl font-bold mt-6 relative top-[14px]">{title}</h3>
                <p className="text-gray-400 mt-3 text-sm leading-relaxed relative top-[16px]">
                  {description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

<div className="h-30"></div>


      {/* About / CTA */}
      <section id="about" className="relative z-10 py-24 px-6">
       <div className="max-w-5xl mx-auto text-center p-12 md:p-20">

          <h2 className="text-6xl  font-bold relative left-32 ">
            Don't wait for downtime.
            <span className="block text-cyan-400 mt-3">
              Stay one step ahead.
            </span>
          </h2>

          <p className="text-gray-300 mt-6 max-w-xl mx-auto relative top-[18px] relative left-[350px]">
            Start monitoring your APIs with TracePulse and
            take control of your service reliability.
          </p>

          <Link to="/signup"
            className="inline-block mt-9 px-8 py-4 rounded-xl
            bg-blue-600 hover:bg-blue-500 transition font-semibold
            shadow-xl shadow-blue-600/30 relative top-[28px] relative left-[140px] ">
            Get Started For Free →
          </Link>
        </div>
      </section>

      <div className="h-25"></div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10
        px-6 py-8">

        <div className="max-w-7xl mx-auto flex flex-col
          md:flex-row justify-between items-center gap-5">

          

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TracePulse. All rights reserved.
          </p>

          

        </div>
      </footer>

      {/* Animation CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(50px, 70px); }
        }

        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-60px, -50px); }
        }

        @keyframes float3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes appear {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 12s ease-in-out infinite;
        }

        .animate-float2 {
          animation: float2 15s ease-in-out infinite;
        }

        .animate-float3 {
          animation: float3 5s ease-in-out infinite;
        }

        .animate-appear {
          animation: appear 1s ease-out both;
        }

        .pulse-line {
          stroke-dasharray: 700;
          stroke-dashoffset: 700;
          animation: pulseDraw 3s ease-in-out infinite alternate;
        }

        @keyframes pulseDraw {
          to { stroke-dashoffset: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>

    </div>
  );
}

export default LandingPage;
