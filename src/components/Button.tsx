type ButtonProps = {
    label: string;
    onclick: any;
};

let Button = ({ label, onclick }: ButtonProps) => {
    return (
        <button className="bg-blue-900 px-12 py-4 border border-white" onClick={onclick}>
            <h2>{label}</h2>
        </button>
    );
};

export default Button;
