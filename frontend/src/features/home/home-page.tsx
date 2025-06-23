import { Features } from "./components/features"
import { Header } from "./components/header"
import { Hero } from "./components/hero"


export const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <Hero />
                <Features />
            </main>
        </div>
    );
}

