
import React from 'react'
import { motion } from 'framer-motion'
import GradientWaves from '../components/GradientWaves';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.25,
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(10px)', scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        scale: 1,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
}

const badgeVariants = {
    hidden: { opacity: 0, scale: 0.85, y: -10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 200, damping: 18 }
    }
}

const Home = () => {
    const navigate = useNavigate();
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative', backgroundColor: 'black', overflow: 'hidden' }}>
            <GradientWaves
                horizonColor="#5227FF"
                waveColor="#FF9FFC"
                crestColor="#FFFFFF"
                speed={0.4}
                amplitude={2.5}
                waveScale={0.7}
                waveRatio={0.9}
                swell={35}
                turbulence={20}
                tilt={1.11}
                zoom={1}
                height={5.5}
                fogDepth={15}
                detail="medium"
                brightness={1}
                opacity={1}
                mouseInteraction
                parallaxStrength={0.5}
                grain
                grainIntensity={0.05}
            />

            {/* subtle top + bottom vignette so text pops on every screen size */}
            <div className="absolute inset-0 z-[5] bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />

            <motion.div
                className="absolute inset-0 flex items-center justify-center z-10 px-5 sm:px-6 md:px-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="text-center w-full max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">

                    {/* Premium badge */}
                    <motion.div
                        variants={badgeVariants}
                        className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 mb-5 sm:mb-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,159,252,0.08)]"
                    >
                        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9FFC] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#FF9FFC]"></span>
                        </span>
                        <span className="text-[10px] sm:text-xs tracking-wide text-white/80 font-medium whitespace-nowrap">
                            AI-Powered Resume Builder
                        </span>
                    </motion.div>

                    {/* Heading with gradient text */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.10] sm:leading-[1.05] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 px-1"
                    >
                        Resumes that get you hired,
                        <br className="hidden xs:block" /> not just noticed
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                        variants={itemVariants}
                        className="text-white/70 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl font-light max-w-[280px] sm:max-w-md md:max-w-xl mx-auto leading-relaxed"
                    >
                        Four AI agents work together to turn your raw experience into a polished, ATS-optimized resume ready in under 30 seconds.
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
                    >
                        <motion.button
                            onClick={() => navigate("/builder")}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 45px rgba(255,255,255,0.45)' }}
                            whileTap={{ scale: 0.96 }}
                            className="w-full sm:w-auto px-7 sm:px-8 py-3 rounded-full bg-white text-black font-semibold text-sm tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow duration-300"
                        >
                            Build My Resume
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.12)' }}
                            whileTap={{ scale: 0.96 }}
                            className="w-full sm:w-auto px-7 sm:px-8 py-3 rounded-full border border-white/30 text-white font-medium text-sm tracking-wide backdrop-blur-md transition-colors duration-300"
                        >
                            See Examples
                        </motion.button>
                    </motion.div>

                    {/* trust line */}
                    <motion.p
                        variants={itemVariants}
                        className="mt-6 sm:mt-8 text-white/40 text-[10px] sm:text-xs tracking-wider uppercase"
                    >
                        Trusted by 10,000+ job seekers worldwide
                    </motion.p>

                </div>
            </motion.div>
        </div>
    )
}

export default Home