/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

export default function Title({ text, theme, setTheme, iconUrl }) {
    return (
      <div className="flex justify-between mb-8 w-full">
        <h1 className="text-5xl tracking-[1.3rem] font-bold text-white">
          {text}
        </h1>
        <button className="transition-transform duration-300 hover:scale-125" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <img src={iconUrl} alt="icon theme" className="transition-transform duration-300" />
        </button>
      </div>
    );
}