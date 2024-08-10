import { useEffect, useRef, RefObject } from 'react';

type Callback = () => void;

const useOnClickOutside = (callback: Callback): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  return ref;
};

export default useOnClickOutside;
