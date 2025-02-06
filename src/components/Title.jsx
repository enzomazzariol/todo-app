/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

export default function Title({ text, theme, setTheme, iconUrl }) {
    return (
      <div className="flex justify-between mb-8 w-full">
        <h1 className="text-5xl tracking-[1.3rem] font-bold text-white">
          {text}
        </h1>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <img src={iconUrl} alt="icon theme" />
        </button>
      </div>
    );
}