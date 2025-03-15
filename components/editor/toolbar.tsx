import { Bold, ChevronLeft, ChevronRight, Italic, Plus, Redo, Strikethrough, Trash2, Type, Underline, Undo } from "lucide-react";
import { Button } from "../ui/button";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $patchStyleText } from "@lexical/selection";
import { $getRoot, $getSelection, $isRangeSelection, createCommand, FORMAT_TEXT_COMMAND, REDO_COMMAND, UNDO_COMMAND } from "lexical";
import { useBookState } from "@/state/book_state";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";

const colorOptions = [
    { code: "black", name: "Black", color: "#000000" },
    { code: "dark_blue", name: "Dark Blue", color: "#0000AA" },
    { code: "dark_green", name: "Dark Green", color: "#00AA00" },
    { code: "dark_aqua", name: "Dark Aqua", color: "#00AAAA" },
    { code: "dark_red", name: "Dark Red", color: "#AA0000" },
    { code: "dark_purple", name: "Dark Purple", color: "#AA00AA" },
    { code: "gold", name: "Gold", color: "#FFAA00" },
    { code: "gray", name: "Gray", color: "#AAAAAA" },
    { code: "dark_gray", name: "Dark Gray", color: "#555555" },
    { code: "blue", name: "Blue", color: "#5555FF" },
    { code: "green", name: "Green", color: "#55FF55" },
    { code: "aqua", name: "Aqua", color: "#55FFFF" },
    { code: "red", name: "Red", color: "#FF5555" },
    { code: "light_purple", name: "Light Purple", color: "#FF55FF" },
    { code: "yellow", name: "Yellow", color: "#FFFF55" },
    { code: "white", name: "White", color: "#FFFFFF" },
  ]

export default function EditorToolbar() {
    const [editor] = useLexicalComposerContext()
    const currentPage = useBookState(state => state.currentPage)
    const setCurrentPage = useBookState(state => state.setCurrentPage)
    const pages = useBookState(state => state.pages)
    const setPages = useBookState(state => state.setPages)

    const formatText = (format: string) => {
        editor.update(() => {
            const selection = $getSelection()
            if(!$isRangeSelection(selection)) return

            if(format.startsWith("color")) {
                const color = format.split("color:")[1]
                console.log(color)
                editor.update(() => {
                    $patchStyleText(selection, {color: color})
                })
            } else {
                switch(format) {
                    case "bold":
                        selection.formatText("bold")
                        break;
                    case "italic":
                        selection.formatText("italic")
                        break;
                    case "underline":
                        selection.formatText("underline")
                        break;
                    case "strikethrough":
                        selection.formatText("strikethrough")
                        break;
                }
            }
        })
    }

    const addPage = () => {
        setCurrentPage(currentPage + 1)
        editor.update(() => {
            $getRoot().clear()
            setPages([...pages, editor.getEditorState().toJSON()])
            console.log(pages)
        })
    }
    
    const removePage = (index: number) => {
        if(currentPage === index) {
            setCurrentPage(0)
            editor.update(() => {
                editor.setEditorState(editor.parseEditorState(pages[0]))
            })
        }
        setPages(pages.filter((_, i) => i !== index))
    }

    const changePage = (index: number) => {
        setCurrentPage(index)
        editor.update(() => {
            editor.setEditorState(editor.parseEditorState(pages[index]))
        })
    }

    return (
        <div className="flex items-center space-x-4 mb-1 bg-gray-100 p-1 rounded-lg">
            <Button onClick={() => {editor.dispatchCommand(UNDO_COMMAND, undefined)}}><Undo/></Button>
            <Button onClick={() => {editor.dispatchCommand(REDO_COMMAND, undefined)}}><Redo/></Button>
            <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => {formatText("bold")}}>
                    <Bold className="h-4 w-4"></Bold>
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italics" onClick={() => {formatText("italic")}}>
                    <Italic className="h-4 w-4"></Italic>
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline" onClick={() => {formatText("underline")}}>
                    <Underline className="h-4 w-4"></Underline>
                </ToggleGroupItem>
                <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough" onClick={() => {formatText("strikethrough")}}>
                    <Strikethrough className="h-4 w-4"></Strikethrough>
                </ToggleGroupItem>
            </ToggleGroup>
            <Popover>
                <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                    <Type className="h-4 w-4" />
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                <div className="space-y-4">
                    <div>
                    <Label className="text-xs mb-1 block">Minecraft Colors</Label>
                    <div className="grid grid-cols-4 gap-1">
                        {colorOptions.map((color) => (
                        <Button
                            key={color.code}
                            variant="outline"
                            className="h-8 w-8 p-0"
                            style={{ backgroundColor: color.color }}
                            onClick={() => formatText(`color:${color.color}`)}
                            title={color.name}
                        />
                        ))}
                    </div>
                    </div>

                    <div className="space-y-2">
                    <Label className="text-xs mb-1 block">Custom Hex Color</Label>
                    <div className="flex gap-2">
                        <div className="flex-1">
                        <input
                            type="color"
                            className="w-full h-8 cursor-pointer"
                            onChange={(e) => formatText(`color:#${e.target.value.substring(1)}`)}
                        />
                        </div>
                        <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                            const input = document.createElement("input")
                            input.type = "color"
                            input.click()
                            input.addEventListener("change", (e) => {
                            formatText(`color:#${(e.target as HTMLInputElement).value.substring(1)}`)
                            })
                        }}
                        >
                        Pick Color
                        </Button>
                    </div>
                    </div>
                </div>
                </PopoverContent>
            </Popover>
            <div className="flex flex-2 items-center justify-end">
                <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => changePage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                    Page {currentPage + 1} of {pages.length}
                </span>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => changePage(Math.min(pages.length - 1, currentPage + 1))}
                    disabled={currentPage === pages.length - 1}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
                </div>

                <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => removePage(currentPage)} disabled={pages.length <= 1}>
                    <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={addPage} disabled={pages.length >= 100}>
                    <Plus className="h-4 w-4" />
                </Button>
                </div>
            </div>
        </div>
    )
}