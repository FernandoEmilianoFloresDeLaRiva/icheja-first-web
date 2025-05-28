import divider from "../../../assets/divider.png";
import secondaryLogo from "../../../assets/secondary-logo.png";

export default function HeaderLogo() {
  return (
    <div className="flex justify-between h-40">
      <img src={divider} alt="Icon divider" className="h-10 w-250 mt-10" />
      <img
        src={secondaryLogo}
        alt="Secondary Logo"
        className="h-16 w-auto object-contain mt-9"
      />
    </div>
  );
}
