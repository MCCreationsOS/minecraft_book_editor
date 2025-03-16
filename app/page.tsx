import MinecraftBookCommandGenerator from "@/components/command_generator";
import MinecraftBookEditor from "@/components/editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DarkModeSwitch from "@/components/ui/dark_mode_switch";
import { MessageCircleWarning } from "lucide-react";
import Link from "next/link";
import { Toaster } from "sonner";
export default function Home() {
    return (
        <main className="container mx-auto py-8 px-4">
            <div className="flex justify-start items-center mb-8 gap-4">
                <h1 className="flex-1 text-4xl font-bold">Minecraft Book Editor</h1>
                <Link href="https://github.com/MCCreationsOS/minecraft_book_editor/issues" target="_blank" className="flex items-center gap-2">
                    <MessageCircleWarning />
                    Report Issues
                </Link>
                <DarkModeSwitch />
            </div>
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
            <Toaster />
        </main>
    );
}
