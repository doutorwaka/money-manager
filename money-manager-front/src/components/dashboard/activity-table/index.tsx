'use client'

import { frontendApi } from "@/lib/api";
import { useEffect, useState } from "react";
import { Activity, columns } from "./columns"
import { DataTable } from "./data-table"

type ActivityType = {
  id: string;
  date: Date;
  description: string;
  value: number;
  type: "expense" | "revenue";
}

type ActivitiesType = {
  activities: ActivityType[];
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

export function ActivityTable() {

  const [data, setData] = useState<ActivityType[]>([]);

  useEffect(() => {
    getData().then((response) => {
      setData(response);
    });
  }, []);

  return (
    <div className="container mx-auto my-8">
      <DataTable columns={columns} data={data} />
    </div>
  )
}