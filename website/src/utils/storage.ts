import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
export default function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void, boolean] {
  const isMounted = useRef(false)
  const [value, setValue] = useState<T>(defaultValue)
  const [isLoading, setIsLoading] = useState(true)

  function setLocalStorage(value: T) {
    setValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setValue(JSON.parse(item))
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
    return () => {
      isMounted.current = false
    }
  }, [key])

  useEffect(() => {
    if (isMounted.current) {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      isMounted.current = true
    }
  }, [key, value])

  return [value, setLocalStorage, isLoading]
}