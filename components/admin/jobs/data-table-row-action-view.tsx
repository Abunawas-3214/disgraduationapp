import { Eye, Copy, Check } from "lucide-react"
import * as z from "zod"
import { useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { jobSchema } from "./schema"

export default function DataTableRowActionView({ job }: { job: z.infer<typeof jobSchema> }) {
  const [copyText, setCopyText] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(job.whatsapp ?? "")
    setCopyText(true)
    setTimeout(() => {
      setCopyText(false)
    }, 3000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center">
              {job.name}
              <Badge variant="outline" className="ml-2">
                {job.campus}
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription>
            {job.status}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <p><span className="font-bold">Date: </span>
            {format(new Date(job.date), "EEEE, d MMMM yyyy")}
          </p>
          <p><span className="font-bold">Session: </span>
            {job.session}
          </p>
          <div className="flex itmes-center gap-2">
            <div className="my-auto">
              <p><span className="font-bold">WhatsApp: </span>
                <a href={`https://wa.me/${job.whatsapp}`} target="_blank" className="hover:underline ">
                  +{job.whatsapp}↗
                </a>
              </p>
            </div>
            {copyText ? (
              <Button
                variant="outline"
                className="flex w-6 h-6 p-0"
              >
                <Check className="w-3 h-3" />
              </Button>
            ) : (
              <Button
                variant="outline"
                className="flex w-6 h-6 p-0"
                onClick={handleCopy}
              >
                <Copy className="w-3 h-3" />
              </Button>
            )}
          </div>
          <p><span className="font-bold">Instagram: </span>
            <a href={`https://instagram.com/${job.instagram}`} target="_blank" className="hover:underline">
              @{job.instagram}↗
            </a>
          </p>
          <p><span className="font-bold">Google Drive: </span>
            {job.drive ?
              <a href={job.drive} target="_blank" className="hover:underline">Open Link ↗</a>
              :
              <span className="text-red-500">Link not yet available</span>
            }
          </p>
          <p><span className="font-bold">Freelance: </span>
            {job.freelance ?
              <span>{job.freelance}</span>
              :
              <span className="text-red-500">No Freelance have taken this job yet</span>
            }
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
