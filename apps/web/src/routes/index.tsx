import { createFileRoute } from "@tanstack/react-router";

import { create } from "zustand";

import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import Layout from "../layout.tsx";

interface CounterState {
  count: number
  increase: () => void
  reset: () => void
}

const useCount = create<CounterState>()((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set(() => ({ count: 0 })),
}))

function Index() {
  const count = useCount(state => state.count)
  const increase = useCount(state => state.increase)
  const reset = useCount(state => state.reset)

  return (
    <>
        <Layout>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={increase}>
                    count is {count}
                </button>
                <div className="card">
                    <button onClick={reset}>
                        reset counter
                    </button>
                </div>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </Layout>
    </>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});
