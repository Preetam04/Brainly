import React, { useEffect, useRef, useState } from "react";

const SliderBar = ({
  arr,
  setFilter,
}: {
  arr: string[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [selected, setSelected] = useState("all");
  const selectorRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  const updateSelectorPosition = () => {
    if (!selectorRef.current || !selected) return;

    const selectedIndex = arr.indexOf(selected);
    const selectedElement = itemRefs.current[selectedIndex];
    if (selectedElement) {
      const { offsetLeft, offsetWidth, offsetHeight, offsetTop } =
        selectedElement;
      selectorRef.current.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
      selectorRef.current.style.width = `${offsetWidth}px`;
      selectorRef.current.style.height = `${offsetHeight}px`;
    }
  };

  // useEffect(() => {
  //   requestAnimationFrame(() => {
  //     updateSelectorPosition();
  //   });
  // }, [selected, arr]);

  useEffect(() => {
    updateSelectorPosition();
  }, [selected, arr]);

  useEffect(() => {
    updateSelectorPosition();
  }, [selected, arr]);

  return (
    <div className="bg-primary/15 w-fit p-1 py-1.5 rounded-md flex gap-3 relative">
      <div
        ref={selectorRef}
        className="absolute z-0 top-0 left-0 bg-primary h-full rounded-md"
      />
      {arr.map((ele, key) => (
        <div
          key={ele}
          ref={(el) => (itemRefs.current[key] = el!)}
          className={` font-medium relative z-10 text-sm py-1 px-2.5 rounded-md capitalize cursor-pointer text-center  ${
            selected === ele ? "text-white" : ""
          }`}
          onClick={() => {
            setSelected(ele);
            setFilter(ele);
          }}
        >
          {ele}
        </div>
      ))}
    </div>
  );
};

export default SliderBar;
