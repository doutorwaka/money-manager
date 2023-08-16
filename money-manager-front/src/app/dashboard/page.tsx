import { ActivityBalance } from "@/components/dashboard/activity-balance";
import { ActivityTable } from "@/components/dashboard/activity-table";
import { InsertActivityForm } from "@/components/dashboard/insert-activity-form";
import { ActivityTableContextProvider } from "@/context/activity-table-context";

export default function Dashboard() {
    return (
        <>
            <InsertActivityForm />
            <ActivityTableContextProvider>
                <ActivityTable />
                <ActivityBalance />
            </ActivityTableContextProvider>
        </>
    );
}