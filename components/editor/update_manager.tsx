import { useBookState } from "@/state/book_state";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalNode, ParagraphNode, RootNode, TextNode } from "lexical";
import { useEffect } from "react";

export default function EditorUpdateManager() {
    const [editor] = useLexicalComposerContext()
    const currentPage = useBookState(state => state.currentPage)
    const pages = useBookState((state) => state.pages);
    const setPages = useBookState(state => state.setPages)

    useEffect(() => {
        // Register a transform listener that runs before updates
        return editor.registerNodeTransform(RootNode, (node) => {
            let totalCharacters = 0
            let paragraphCount = 0
            node.getChildren().forEach((child) => {
                if (child.getType() === "paragraph") {
                    paragraphCount++
                    let textInParagraph = 0
                    const paragraph = child as ParagraphNode    
                    paragraph.getChildren().forEach((child: LexicalNode) => {
                        if (child.getType() === "text") {
                            const textNode = child as TextNode
                            totalCharacters += textNode.getTextContent().length
                            textInParagraph += textNode.getTextContent().length
                        }
                    })
                    paragraphCount = paragraphCount + Math.floor(textInParagraph / 19)
                }
            })

            // If current state exceeds limits or we can't add more paragraphs
            if (paragraphCount > 14 || 
                totalCharacters > 266) {
                throw new Error("Text content is too long for a single page.")
            }
        })
    }, [editor])

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