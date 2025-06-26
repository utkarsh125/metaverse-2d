"use client"

import VirtualSpaceCanvas from "../../../../components/virtual-space-canvas"
import { useParams } from "next/navigation"

export default function SpacePage() {
  const params = useParams()
  const spaceId = params.spaceId as string

  // Get token from localStorage or props - assuming auth is handled elsewhere
  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : ""

  return (
    <div className="w-full h-screen bg-gray-900">
      <VirtualSpaceCanvas spaceId={spaceId} token={token} />
    </div>
  )
}
