import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';
import { AppState, ProductRequest } from '../data/data-types/types';

interface AppStateInterface {
  appData: AppState | null;
  setAppData: Dispatch<SetStateAction<AppState | null>>;
  suggestions: ProductRequest[] | null;
  setSuggestions: Dispatch<SetStateAction<ProductRequest[] | null>>;
  feedback: ProductRequest | null;
  setFeedback: Dispatch<SetStateAction<ProductRequest | null>>;
}

const defaultState = {
  appData: null,
  setAppData: (data: AppState | null) => {},
  suggestions: null,
  setSuggestions: (suggestions: ProductRequest[] | null) => {},
  feedback: null,
  setFeedback: (feedback: ProductRequest | null) => {},
} as AppStateInterface;

export const AppContext = createContext(defaultState);

interface Props {
  children: ReactNode;
}

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [appData, setAppData] = useState<AppState | null>(null);
  const [suggestions, setSuggestions] = useState<ProductRequest[] | null>(null);
  const [feedback, setFeedback] = useState<ProductRequest | null>(null);

  return (
    <AppContext.Provider
      value={{
        appData,
        setAppData,
        suggestions,
        setSuggestions,
        feedback,
        setFeedback,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
