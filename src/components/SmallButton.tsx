import React from "react";

const SmallButton = (props: {
  name?: string;
  onClick?: () => void;
  children?: JSX.Element;
}): React.ReactElement => {
  const { name, onClick, children } = props;
  return (
    <div>
      <button
        onClick={onClick}
        className="m-1 rounded-full bg-slate-700 py-2 px-5 text-[11px] text-white first-letter:capitalize hover:bg-black sm:text-sm "
      >
        {name ? name : children}
      </button>
    </div>
  );
};

export default SmallButton;
