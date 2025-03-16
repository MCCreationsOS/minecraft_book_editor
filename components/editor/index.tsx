"use client"

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import EditorToolbar from "./toolbar";
import EditorUpdateManager from "./update_manager";
import { useBookState } from "@/state/book_state";
import { toast } from "sonner";

const theme = {
    text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
        strikethrough: "line-through",
        obfuscated: "obfuscated",
        color: "text-white"
    }
}

function onError(error: Error) {
    // console.error(error);
    toast.error(error.message)
}

export default function MinecraftBookEditor() {
    const title = useBookState(state => state.title)
    const author = useBookState(state => state.author)
    const setTitle = useBookState(state => state.setTitle)
    const setAuthor = useBookState(state => state.setAuthor)


    const config = {
        namespace: "minecraft-book-editor",
        plugins: [
            RichTextPlugin,
            HistoryPlugin
        ],
        theme,
        onError
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Book Title</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={32} // Minecraft title length limit
                        className="font-minecraft"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        maxLength={32} // Reasonable author name length
                        className="font-minecraft"
                    />
                </div>
            </div>
            <LexicalComposer initialConfig={config}>
                <EditorToolbar />
                <RichTextPlugin
                contentEditable={
                    <ContentEditable className="w-[500px] h-[700px] bg-[#fffaee] border-[#75321e] border-4 rounded-lg p-3 pt-15 font-minecraft text-5xl text-black overflow-y-auto"/>
                }
                ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin/>
                <EditorUpdateManager />
            </LexicalComposer>
        </div>
    )
}