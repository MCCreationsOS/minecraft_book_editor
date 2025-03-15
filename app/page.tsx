import MinecraftBookCommandGenerator from "@/components/command_generator";
import MinecraftBookEditor from "@/components/editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
    return (
        <main className="container mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Minecraft Book Editor</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-card rounded-lg p-4 border">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Editor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MinecraftBookEditor />
                    </CardContent>
                </Card>
                <Card className="bg-card rounded-lg p-4 border">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Command</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MinecraftBookCommandGenerator />
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
