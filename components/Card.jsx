import { MdSupervisedUserCircle } from "react-icons/md";

const Card = ({ title, count }) => {
  return (
    <div className="bg-[#cedcc3] p-5 rounded-lg flex items-center gap-5 cursor-pointer hover:bg-[#FDFAF6] transition-colors w-full">
      <MdSupervisedUserCircle size={24} />
      <div className="flex flex-col gap-2">
        <span className="text-gray-600">{title}</span>
        <span className="text-2xl font-medium">{count}</span>
      </div>
    </div>
  );
};

export default Card;
