import { motion } from "framer-motion";
import { useNavigatePage } from "../../hooks/useNavigatePage";
import { Link } from "react-router-dom";
import { facebookConstants } from "../../constants/data";

const FacebookButton = () => {
  const { redirect } = useNavigatePage();

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <Link
      to={`https://www.facebook.com/v16.0/dialog/oauth?client_id=${facebookConstants.clientID}&redirect_uri=${facebookConstants.callbackUrl}`}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-black p-2 text-white focus:outline-none"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M19.7143 0H4.28571C1.91852 0 0 1.91852 0 4.28571V19.7143C0 22.0815 1.91852 24 4.28571 24H19.7143C22.0815 24 24 22.0815 24 19.7143V4.28571C24 1.91852 22.0815 0 19.7143 0ZM16.586 7.90057H14.5573C13.7279 7.90057 13.3897 8.52623 13.3897 9.31974V11.1221H16.4466L16.1148 14.2782H13.3897V24H9.85854V14.2782H7.13285V11.1221H9.85854V8.67866C9.85854 5.84808 11.7085 3.9981 14.4035 3.9981C15.4909 3.9981 16.5056 4.12894 16.586 4.16048V7.90057Z" />
        </svg>
      </motion.div>
    </Link>
  );
};

export default FacebookButton;
