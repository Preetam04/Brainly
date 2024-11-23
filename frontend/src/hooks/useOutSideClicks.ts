import { useEffect } from "react";

const useOutsideClick = (ref, onOutsideClick, excludeClassesOrIds = []) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const shouldExclude = excludeClassesOrIds.some((exclude) => {
        return (
          event.target.id === exclude ||
          event.target.classList.contains(exclude)
        );
      });

      if (shouldExclude) return;

      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref, onOutsideClick, excludeClassesOrIds]);
};

export default useOutsideClick;
