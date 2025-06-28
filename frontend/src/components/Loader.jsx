import { motion } from "framer-motion";

export default function Loader() {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const loadingCircleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <motion.div
        className="flex justify-around w-16"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          className="block h-4 w-4 rounded-full bg-gradient-to-r from-green-500 to-green-600"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          className="block h-4 w-4 rounded-full bg-gradient-to-r from-green-500 to-green-600"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          className="block h-4 w-4 rounded-full bg-gradient-to-r from-green-500 to-green-600"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      </motion.div>
    </div>
  );
}