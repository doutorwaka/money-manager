'use client'

import { ActivityTableContext } from "@/context/activity-table-context";
import { useContext } from "react";

export function ActivityBalance() {

    const activityTableContext = useContext(ActivityTableContext);

    const balance = activityTableContext.balance;

    var className = "text-emerald-500";

    if (balance < 0) {
        className = "text-red-500"
    }

    return (
        <>
            <div className="flex gap-4 p-4 px-8 py-12 text-xl font-bold">
                <p>Total: </p>
                <p className={className}>
                    R$ {balance.toLocaleString("pt-BR",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                </p>
            </div>
        </>
    );
}