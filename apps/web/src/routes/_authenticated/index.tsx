import { createFileRoute } from "@tanstack/react-router";
import { create } from "zustand";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/ui/components/ui/card";
import { Badge } from "@shared/ui/components/ui/badge";
import { ProductTable } from "../../components/product.table.tsx";
import { productsPlaceholder } from "../../components/dummy";

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
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Badge variant="secondary">{productsPlaceholder.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productsPlaceholder.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Categories
            </CardTitle>
            <Badge variant="outline">Live</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +4 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <Badge>24</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Counter Demo
            </CardTitle>
            <Badge variant="destructive">{count}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count}</div>
            <div className="flex gap-2 mt-2">
              <button
                className="text-xs bg-primary text-primary-foreground hover:bg-primary/80 px-2 py-1 rounded"
                onClick={increase}
              >
                Increase
              </button>
              <button
                className="text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 rounded"
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your product inventory and catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable />
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});