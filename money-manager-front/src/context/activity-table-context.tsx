'use client'

import { ActivitiesType, ActivityType } from "@/app/api/activities/route"
import { frontendApi } from "@/lib/api";
import { createContext, useEffect, useState } from "react";

type ActivityTableContextType = {
    activities: ActivityType[];
    balance: number;
    refreshTable: () => void;
}

async function getBalance(): Promise<number> {
    var data: number = 0.0;

    try {
        const result = await frontendApi.get("/activities/balance");

        const balance = result.data as number;

        if (balance) {
            data = balance;
        }

    } catch (e) {
        data = 0.0;
    }

    return data;
}

async function getActivities(): Promise<ActivityType[]> {

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

async function getData() {
    const [activities, balance] = await Promise.all([getActivities(), getBalance()]);

    return { activities, balance };
}

export const ActivityTableContext = createContext({} as ActivityTableContextType);

var balance: number = 0;

export function ActivityTableContextProvider({ children }: { children: React.ReactNode }) {

    const [activities, setActivities] = useState<ActivityType[]>([]);    

    function refreshTable() {
        getData().then((response) => {
            balance = response.balance;
            setActivities(response.activities);
        });
    }

    useEffect(() => {
        refreshTable();
    }, []);

    return (
        <ActivityTableContext.Provider value={{ activities, balance, refreshTable }}>
            {children}
        </ActivityTableContext.Provider>
    )
}