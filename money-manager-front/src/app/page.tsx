import { BadgeDollarSign } from "lucide-react";

export default function Home() {
  return (
    <main>
      <div className="flex items-center h-screen">

        <div className="container p-8 max-w-md h-96 rounded-xl bg-gray-50 shadow-md">
          <span className="flex items-center gap-2">
            <BadgeDollarSign className="text-slate-500" size={48} />
            <h1 className="uppercase text-slate-600 font-bold text-xl">Money Manager</h1>
          </span>
          
        </div>

      </div>
    </main>
  )
}
