import { ActivityBalance } from "@/components/dashboard/activity-balance";
import { ActivityTable } from "@/components/dashboard/activity-table";
import { InsertActivityForm } from "@/components/dashboard/insert-activity-form";

export default function Dashboard() {
    return (
        <>
            <InsertActivityForm />
            <ActivityTable />
            <ActivityBalance />
        </>
    );
}