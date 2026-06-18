import { ReactNode } from "react"

export function H1 ({ children }: { children: ReactNode }) {
    return <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        {children}
    </h1>
}

export function H2 ({ children }: { children: ReactNode }) {
    return <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {children}
    </h2>   
}

export function H3 ({ children }: { children: ReactNode }) {
    return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {children}
    </h3>
}

export function H4 ({ children }: { children: ReactNode }) {
    return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {children}
    </h4>   
}

export function P ({ children }: { children: ReactNode }) {
    return <p className="leading-7 not-first:mt-6">
        {children}
    </p>   
}

export function Muted ({ children }: { children: ReactNode}) {
    return <p className="text-sm text-muted-foreground">{children}</p>
}
