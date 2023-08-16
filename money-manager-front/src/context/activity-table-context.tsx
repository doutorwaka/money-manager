'use client'

import { ActivitiesType, ActivityType } from "@/app/api/activities/route"
import { frontendApi } from "@/lib/api";
import { createContext, useEffect, useState } from "react";

type ActivityTableContextType = {
    activities: ActivityType[];
    refreshTable: () => void;
}

async function getData(): Promise<ActivityType[]> {

    var data: ActivityType[] = [];

    try {
        const result = await frontendApi.get("/activities");

        const { activities } = result.data as ActivitiesType;

        if (activities) {
            data = activities;
        }

    } catch (e) {
        data = [];
    }

    return data;

}

export const ActivityTableContext = createContext({} as ActivityTableContextType);

export function ActivityTableContextProvider({ children }: { children: React.ReactNode }) {

    const [activities, setActivities] = useState<ActivityType[]>([]);

    useEffect(() => {
        getData().then((response) => {
            setActivities(response);
        });
    }, []);

    function refreshTable() {
    }

    return (
        <ActivityTableContext.Provider value={{ activities, refreshTable }}>
            {children}
        </ActivityTableContext.Provider>
    )
}