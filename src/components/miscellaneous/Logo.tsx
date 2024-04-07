import { Link } from "react-router-dom";
interface LogoProps {
  title: string;
  icon?: React.ReactNode;
  link?: string;
}

const Logo = ({ title, icon, link }: LogoProps) => {
  return (
    <Link to={link || "/"}>
      <h1 className="text-blue-700 font-bold flex items-center gap-1">
        {icon && <span>{icon}</span>}
        {title}
      </h1>
    </Link>
  );
};

export default Logo;
