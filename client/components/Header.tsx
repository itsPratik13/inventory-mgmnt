import React from "react";

type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps) => {
  return (
    <div className="mb-4 border-b border-zinc-800 pb-2 flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-white">
        {name}
      </h1>
    </div>
  );
};

export default Header;
