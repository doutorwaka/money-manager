'use client'
import { ActivityTableContext } from "@/context/activity-table-context"
import { useContext } from "react";
import { columns } from "./columns"
import { DataTable } from "./data-table"



export function ActivityTable() {

  const activityTableContext = useContext(ActivityTableContext);

  const activities = activityTableContext.activities;

  return (
    <div className="container mx-auto my-8">
      <DataTable columns={columns} data={activities} />
    </div>
  )
}