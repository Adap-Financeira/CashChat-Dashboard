"use client";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  async function getUserId() {
    const response = await fetch("http://localhost:5001/api/auth/example", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  }

  return (
    <div>
      <h1>Dashboardaa</h1>
      <Button onClick={getUserId}>Get user id</Button>
    </div>
  );
}
