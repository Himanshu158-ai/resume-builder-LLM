import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Download } from "lucide-react"

export default function HomePage() {
    const navigate = useNavigate();

    const words = ["Professional", "ATS Friendly", "Modern", "AI Generated"];
    const [index, setIndex] = useState(0);
    const [colorIndex, setColorIndex] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(()=>{
        const color = setInterval(() => {
            setColorIndex((prev)=>!prev);
        }, 2000);
        return () => clearInterval(color);
    },[])

    return (
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">

            {/* glow background */}
            <div className="absolute top-0 left-0 w-40 md:w-60 h-40 md:h-60 bg-blue-300 opacity-20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-40 md:w-60 h-40 md:h-60 bg-indigo-300 opacity-20 blur-3xl rounded-full"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20 grid md:grid-cols-2 gap-10 md:gap-12 items-center relative z-10">

                {/* LEFT */}
                <div className="text-center md:text-left">
                    <div className="inline-flex items-center gap-2 
bg-white/60 backdrop-blur-lg 
px-4 py-1 rounded-full border text-sm">

                        <span className={`w-2 h-2 ${colorIndex ? "bg-blue-600" : "bg-red-600"} rounded-full`}></span>

                        AI Resume Builder
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-6 leading-tight">
                        Build{" "}
                        <span className="text-blue-600 inline-block min-w-[140px] md:min-w-[220px]">
                            {words[index]}
                        </span>
                        <br />
                        Resume In Seconds
                    </h1>

                    <p className="text-gray-600 mt-4 md:mt-5 text-base md:text-lg">
                        Tell us about yourself and our AI will generate a professional,
                        job-ready resume in seconds.
                    </p>

                    <button
                        onClick={() => navigate("/builder")}
                        className="mt-5 bg-gradient-to-r from-blue-500 to-indigo-700 
            text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold
            shadow-lg hover:shadow-xl transition duration-300
            hover:scale-95"
                    >
                        Create Your Resume
                    </button>

                    {/* glass features */}
                    <div className="flex gap-4 md:gap-4 mt-6 md:mt-8 flex-wrap justify-center md:justify-start">

  <div className="inline-flex items-center gap-2 
bg-gradient-to-t from-purple-500/5 to-transparent
backdrop-blur-xl 
border border-blue-200/40 
px-4 md:px-5 py-2 md:py-2.5
rounded-full 
shadow-lg 
hover:bg-white/40
hover:scale-105
transition-all duration-300">

    <span className="text-base md:text-lg">🤖</span>
    <span className="font-medium text-gray-800 text-sm md:text-base">
      ATS Friendly
    </span>
  </div>

  <div className="inline-flex items-center gap-2 
bg-gradient-to-l from-blue-500/5 to-transparent
backdrop-blur-xl 
border border-blue-200/40 
px-4 md:px-5 py-2 md:py-2.5
rounded-full 
shadow-lg 
hover:bg-white/40
hover:scale-105
transition-all duration-300">

    <Download size={16} className="md:w-[18px] md:h-[18px]" />
    <span className="font-medium text-gray-800 text-sm md:text-base">
      Instant
    </span>
  </div>

</div>
                </div>

                {/* RIGHT */}
                <div className="relative overflow-hidden transition duration-300 md:hover:scale-[1.02] md:rotate-3 mt-0 md:mt-0 rotate-3">

                    <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6">

                        <div className="border-b pb-3">
                            <h2 className="text-lg md:text-xl font-bold">Himanshu~</h2>
                            <p className="text-gray-500 text-sm">
                                MERN Stack Developer
                            </p>
                        </div>

                        <div className="mt-4 space-y-3">
                            <div>
                                <div className="h-2 bg-gray-200 rounded w-32 mb-2"></div>
                                <div className="h-2 bg-gray-100 rounded"></div>
                                <div className="h-2 bg-gray-100 rounded mt-1 w-5/6"></div>
                            </div>

                            <div>
                                <div className="h-2 bg-gray-200 rounded w-24 mb-2"></div>
                                <div className="h-2 bg-gray-100 rounded"></div>
                                <div className="h-2 bg-gray-100 rounded mt-1 w-4/6"></div>
                            </div>

                            <div>
                                <div className="h-2 bg-gray-200 rounded w-20 mb-2"></div>
                                <div className="h-2 bg-gray-100 rounded"></div>
                                <div className="h-2 bg-gray-100 rounded mt-1 w-3/6"></div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-4 -left-2 md:-left-4 
bg-white/40 backdrop-blur-lg border border-white/30
shadow-2xl px-3 md:px-4 py-2 md:py-3 rounded-xl text-sm">
                        ⚡ AI Generated
                    </div>

                </div>

            </div>

        </div>
    );
}