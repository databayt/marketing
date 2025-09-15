'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Config = {
  theme: string;
  radius: number;
};

const ConfigContext = createContext<
  [Config, (config: Config) => void] | undefined
>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Config>({
    theme: 'zinc',
    radius: 0.5,
  });

  return (
    <ConfigContext.Provider value={[config, setConfig]}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    // Return default values if not in provider
    return [
      { theme: 'zinc', radius: 0.5 },
      () => {},
    ] as [Config, (config: Config) => void];
  }
  return context;
}