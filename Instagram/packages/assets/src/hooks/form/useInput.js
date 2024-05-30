import {useState} from 'react';

/**
 * @param defaultState
 * @returns {[]}
 */
export default function useInput(defaultState = null) {
  const [input, setInput] = useState(defaultState);

  const handleInputChange = (key, value) => setInput(prev => ({...prev, [key]: value}));

  return [input, handleInputChange, setInput];
}
