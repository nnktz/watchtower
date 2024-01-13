'use client'

import Webcam from 'react-webcam'
import { useRef, useState } from 'react'
import { Camera, FlipHorizontal, PersonStanding, Video } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Rings } from 'react-loader-spinner'
import { VolumePopover } from '@/components/volume-popover'

const HomePage = () => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [mirrored, setMirrored] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [autoRecordEnable, setAutoRecordEnable] = useState(false)

  const usePromptScreenshot = () => {}

  const usePromptRecord = () => {}

  const toggleAutoRecord = () => {
    if (autoRecordEnable) {
      setAutoRecordEnable(false)
      toast('Auto record enabled!')
    } else {
      setAutoRecordEnable(true)
      toast('Auto record disabled!')
    }
  }

  return (
    <div className="flex h-screen">
      {/* Webcam and canvas */}
      <div className="relative">
        <div className="relative h-screen w-full">
          <Webcam
            ref={webcamRef}
            mirrored={mirrored}
            className="h-full w-full object-contain p-2"
          />

          <canvas
            ref={canvasRef}
            className="absolute left-0 top-0 h-full w-full object-contain"
          ></canvas>
        </div>
      </div>

      {/* Container for button panel and wiki person */}
      <div className="flex flex-1">
        <div className="flex max-w-xs flex-col justify-between gap-2 rounded-md border-2 border-primary/5 p-4 shadow-md">
          <div className="flex flex-col gap-2">
            <ModeToggle />

            <Button variant={'outline'} size={'icon'} onClick={() => setMirrored((prev) => !prev)}>
              <FlipHorizontal />
            </Button>

            <Separator className="my-2" />
          </div>

          <div className="flex flex-col gap-2">
            <Separator className="my-2" />

            <Button variant={'outline'} size={'icon'} onClick={usePromptScreenshot}>
              <Camera />
            </Button>

            <Button
              variant={isRecording ? 'destructive' : 'outline'}
              size={'icon'}
              onClick={usePromptRecord}
            >
              <Video />
            </Button>

            <Separator className="my-2" />

            <Button
              variant={autoRecordEnable ? 'destructive' : 'outline'}
              size={'icon'}
              onClick={toggleAutoRecord}
            >
              {autoRecordEnable ? <Rings color="white" height={45} /> : <PersonStanding />}
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <Separator className="my-2" />

            <VolumePopover />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
