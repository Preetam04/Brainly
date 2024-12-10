import { useEffect } from "react";

const useOutsideClick = (
  ref: React.RefObject<HTMLInputElement>,
  onOutsideClick: () => any,
  excludeClassesOrIds = []
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const shouldExclude = excludeClassesOrIds.some((exclude) => {
        return (
          // @ts-ignore
          event.target.id === exclude ||
          // @ts-ignore
          event.target.classList.contains(exclude)
        );
      });

      if (shouldExclude) return;

      // @ts-ignore
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
