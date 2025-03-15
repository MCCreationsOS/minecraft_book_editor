"use client"

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useBookState } from "@/state/book_state";
import { SerializedEditorState, SerializedLexicalNode, SerializedTextNode, SerializedParagraphNode } from "lexical";
import { useState } from "react";

export function generateCommand1204(author: string, title: string, pages: SerializedEditorState[]) { 
    // Convert pages to Minecraft book format
    const formattedPages = pages.map(page => {
        let pageObject: {text: string, bold?: boolean, italic?: boolean, strikethrough?: boolean, underline?: boolean, color?: string}[] = []
        const nodes = page.root.children as SerializedLexicalNode[]

        nodes.forEach((node) => {
            if (node.type === "paragraph") {
                const paragraphNode = node as SerializedParagraphNode
                paragraphNode.children.forEach((child) => {
                    if (child.type === "text") {
                        const textNode = child as SerializedTextNode
                        let text = textNode.text

                        let obj: {text: string, bold?: boolean, italic?: boolean, strikethrough?: boolean, underline?: boolean, color?: string} = {text: text}
                        if (textNode.format & 1) { // Bold
                            obj.bold = true
                        }
                        if (textNode.format & 2) { // Italic
                            obj.italic = true
                        }
                        if (textNode.format & 4) { // Strikethrough
                            obj.strikethrough = true
                        }
                        if (textNode.format & 8) { // Underline
                            obj.underline = true
                        }
                        if (textNode.style) {
                            obj.color = textNode.style
                        }
                        pageObject.push(obj)
                    }
                })
                pageObject.push({text: "\\n"})
            }
        })

        return `'${JSON.stringify(pageObject).replaceAll(`'`, `\\'`)}'`
    })

    // Generate the give command
    return `/give @s written_book[written_book_content={pages:[${formattedPages.join(",")}],author:"${author}",title:"${title}"}]`
}

// Helper to convert hex colors to Minecraft color codes
function getMinecraftColorCode(hex: string): string {
    const colors: {[key: string]: string} = {
        "#000000": "§0", // Black
        "#0000AA": "§1", // Dark Blue
        "#00AA00": "§2", // Dark Green
        "#00AAAA": "§3", // Dark Aqua
        "#AA0000": "§4", // Dark Red
        "#AA00AA": "§5", // Dark Purple
        "#FFAA00": "§6", // Gold
        "#AAAAAA": "§7", // Gray
        "#555555": "§8", // Dark Gray
        "#5555FF": "§9", // Blue
        "#55FF55": "§a", // Green
        "#55FFFF": "§b", // Aqua
        "#FF5555": "§c", // Red
        "#FF55FF": "§d", // Light Purple
        "#FFFF55": "§e", // Yellow
        "#FFFFFF": "§f"  // White
    }

    return colors[hex] || ""
}

export default function MinecraftBookCommandGenerator() {
    const pages = useBookState((state) => state.pages);
    const author = useBookState((state) => state.author)
    const title = useBookState((state) => state.title)
    const [useLore, setUseLore] = useState(false);
    const [loreText, setLoreText] = useState("");

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="include-lore"
                        checked={useLore}
                        onCheckedChange={(checked) =>
                            setUseLore(checked as boolean)
                        }
                    />
                    <Label htmlFor="include-lore">Include lore text</Label>
                </div>

                {useLore && (
                    <div className="pt-2 space-y-2">
                        <Label htmlFor="lore-text">Lore Text</Label>
                        <Textarea
                            id="lore-text"
                            value={loreText}
                            onChange={(e) => setLoreText(e.target.value)}
                            className="h-20"
                            maxLength={50} // Reasonable lore length
                        />
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="command">Generated Command</Label>
                <div className="relative">
                    <Textarea
                        id="command"
                        value={generateCommand1204(author, title, pages)}
                        readOnly
                        className="h-32 font-mono text-xs pr-10"
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        className={cn(
                            "absolute top-2 right-2 h-8 w-8",
                            // copied && "text-green-500"
                        )}
                        // onClick={copyCommand}
                    >
                        {/* {copied ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )} */}
                    </Button>
                </div>
            </div>

            <div className="text-sm text-muted-foreground">
                <p>Paste this command in Minecraft 1.21.4 to get your book.</p>
            </div>
        </div>
    );
}
