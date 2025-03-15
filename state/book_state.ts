import { SerializedEditorState } from "lexical"
import { create } from "zustand"

interface BookState {
    title: string,
    author: string,
    pages: SerializedEditorState[]
    currentPage: number

    setTitle: (title: string) => void
    setAuthor: (author: string) => void
    setPages: (pages: SerializedEditorState[]) => void
    setCurrentPage: (page: number) => void
}

export const useBookState = create<BookState>((set) => ({
    title: "Unkown",
    author: "Anonymous",
    pages: [],
    currentPage: 0,

    setTitle: (title: string) => set(() => ({ title })),
    setAuthor: (author: string) => set(() => ({ author })),
    setPages: (pages: SerializedEditorState[]) => set(() => ({ pages })),
    setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
}))