type IconTypes = "wrong" | "reset" | "view" | "switch" | "next";

type ButtonProps = {
    label?: string;
    onclick: () => void;
    red?: boolean;
    icon?: IconTypes;
};

import icons from "../assets/icons";

let Button = ({ label, onclick, red = false, icon }: ButtonProps) => {
    let thisIcon = null;
    switch (icon) {
        case "wrong":
            thisIcon = icons.wrongButton;
            break;
        case "reset":
            thisIcon = icons.resetHearts;
            break;
        case "view":
            thisIcon = icons.viewAll;
            break;
        case "switch":
            thisIcon = icons.switchTeams;
            break;
        case "next":
            thisIcon = icons.next;
            break;
    }
    return (
        <button
            className={
                red
                    ? " bg-[#b32303] border-2 border-[#ea3d07] rounded-lg h-full px-4 font-semibold flex space-x-4 items-center justify-center"
                    : "bg-[#0345b3] border-2 border-[#076DEA] rounded-lg h-full px-4 font-semibold flex space-x-4 items-center"
            }
            onClick={onclick}>
            {label && <h2 className="text-lg">{label}</h2>}
            {thisIcon && (label ?  <img src={thisIcon} width="16" /> : <img src={thisIcon} width="26" />)}
        </button>
    );
};

export default Button;
