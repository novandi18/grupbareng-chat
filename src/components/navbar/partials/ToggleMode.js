import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { Tooltip } from "flowbite-react/lib/esm/components/Tooltip";

const ToggleMode = () => {
  const setMode = () => {
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  };

  return (
    <div className="mr-3 flex items-center">
      <Tooltip animation={true} content="Switch Theme">
        <button
          onClick={setMode}
          type="button"
          className="h-9 w-9 rounded-lg flex justify-center items-center bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-500 duration-75 ease-in active:border-2 active:border-solid active:border-slate-300 dark:bg-slate-700 outline-none dark:hover:bg-slate-600 dark:hover:text-slate-300 dark:active:border-slate-500"
        >
          <MoonIcon className="h-5 w-5 dark:hidden" />
          <SunIcon className="h-5 w-5 dark:flex hidden" />
        </button>
      </Tooltip>
    </div>
  );
};

export default ToggleMode;
