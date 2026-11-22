import { Mail, MapPin } from "lucide-react";





const Contact = () => {

  


  return (
    <>
        
    
    <section className="min-h-screen bg-[#070B14] text-white flex items-center justify-center px-6 py-20">

      <div className="max-w-5xl w-full">

        {/* Heading */}
        <div className="text-center mb-16">

          <p className="text-cyan-400 tracking-[5px] font-semibold mb-4 text-6xl relative bottom-[60px]">
            CONTACT US
          </p>

          <h1 className="text-4xl md:text-4xl font-bold mb-5 relative bottom-[50px]">
            Get in <span className="text-cyan-400">Touch</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-xl mx-auto relative left-[260px] relative bottom-[41px]">
            Have questions or need assistance? Reach out to us.
            We're always happy to connect.
          </p>

        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Email */}
          <div className="group p-10 rounded-2xl
            bg-white/[0.04] border border-white/10
            hover:border-cyan-400/50 hover:-translate-y-2
            transition-all duration-300 text-center">

            <div className="w-16 h-16 mx-auto mb-6
              flex items-center justify-center
              rounded-2xl bg-cyan-400/10 text-cyan-400
              group-hover:bg-cyan-400 group-hover:text-black
              transition-all">

              <Mail size={30} />

            </div>

            <h2 className="text-3xl font-bold mb-4">
              Email Address
            </h2>

            <p className="text-gray-400 mb-3">
              Send us your queries anytime.
            </p>

            <a
              href="mailto:support@apimonitor.com"
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              support@tracepulse.com
            </a>

          </div>

          {/* Office Address */}
          <div className="group p-10 rounded-2xl
            bg-white/[0.04] border border-white/10
            hover:border-cyan-400/50 hover:-translate-y-2
            transition-all duration-300 text-center">

            <div className="w-16 h-16 mx-auto mb-6
              flex items-center justify-center
              rounded-2xl bg-cyan-400/10 text-cyan-400
              group-hover:bg-cyan-400 group-hover:text-black
              transition-all">

              <MapPin size={30} />

            </div>

            <h2 className="text-3xl font-bold mb-4 relative bottom-[18px]">
              Office Address
            </h2>

            <p className="text-gray-400 mb-3 relative bottom-[15px]">
              Building no-4.floor no-6
            </p>

            <p className="text-cyan-400 leading-7 relative bottom-[15px]">
              Saket,<br />
              Delhi, India
            </p>

          </div>

        </div>

        {/* Bottom Text */}
        <div className="text-center ">
          <p className="text-cyan-500 relative top-[35px] text-2xl">
            We're always happy to hear from you.
          </p>
        </div>

      </div>

    </section>
    </>
  );
};

export default Contact;
