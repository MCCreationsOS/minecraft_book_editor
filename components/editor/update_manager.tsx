
import { useBookState } from "@/state/book_state";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function EditorUpdateManager() {
    const [editor] = useLexicalComposerContext()
    const currentPage = useBookState(state => state.currentPage)
    const pages = useBookState((state) => state.pages);
    const setPages = useBookState(state => state.setPages)

    useEffect(() => {
        editor.registerUpdateListener(({editorState}) => {
            const serialized = editorState.toJSON()
            const newPages = [...pages]
            newPages[currentPage] = serialized
            setPages(newPages)
        })
    }, [editor, pages, currentPage, setPages])

    return null
}