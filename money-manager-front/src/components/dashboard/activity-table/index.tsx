import { Activity, columns } from "./columns"
import { DataTable } from "./data-table"

const data: Activity[] = [
    {
        id: "1",
        date: new Date("07-25-2023"),
        description: "Pagamento de conta de luz",
        value: 250.95,
        type: "expense"
    }, 

    {
        id: "2",
        date: new Date("07-20-2023"),
        description: "Pagamento de internet",
        value: 99.90,
        type: "expense"
    },

    {
        id: "3",
        date: new Date("07-20-2023"),
        description: "Pagamento de aluguel",
        value: 1200.00,
        type: "expense"
    },
    {
        id: "4",
        date: new Date("07-05-2023"),
        description: "Salário de julho",
        value: 2000,
        type: "revenue"
    },
]

function getData(): Activity[] {
  // Fetch data from your API here.
  return data;
}

export function ActivityTable() {
  const data = getData()

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  )
}