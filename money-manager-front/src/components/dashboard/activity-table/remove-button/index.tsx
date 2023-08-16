import { Button } from "@/components/ui/button";
import { ActivityTableContext } from "@/context/activity-table-context";
import { frontendApi } from "@/lib/api";
import { useContext } from "react";

type RemoveButtonProps = {
    id: string;
}

async function removeActivity(id: string) {
    try {
        const url = `/activities/${id}`;
        const result = await frontendApi.delete(url);
    } catch (e) {
        alert("Impossível remover!");
    }
}

export function RemoveButton({ id }: RemoveButtonProps) {
    const activityTableContext = useContext(ActivityTableContext);

    return (
        <Button variant="ghost"
            key={id}
            onClick={async () => {
                await removeActivity(id);
                activityTableContext.refreshTable();
            }}>Remover</Button>
    )
}