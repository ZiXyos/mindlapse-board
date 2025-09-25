import { createFileRoute } from '@tanstack/react-router'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@shared/ui/components/ui/card";
import {LoginForm} from "@shared/ui/components/auth/login.form";

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
            <Card className={'w-full max-w-sm shadow-xl border-0 bg-white/80 backdrop-blur-sm'}>
                <CardHeader>
                    <CardTitle>Welcome to mindboard admin panel</CardTitle>
                    <CardDescription>Enter email below</CardDescription>
                </CardHeader>

                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    )
}
