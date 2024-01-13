'use client'

import * as cocossd from '@tensorflow-models/coco-ssd'
import Webcam from 'react-webcam'
import { useEffect, useRef, useState } from 'react'
import { Camera, FlipHorizontal, PersonStanding, Video } from 'lucide-react'
import { toast } from 'sonner'
import { Rings } from 'react-loader-spinner'

import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'

import { resizeCanvas } from '@/lib/canvas'
import { drawOnCanvas } from '@/lib/draw'

import { Separator } from '@/components/ui/separator'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { VolumePopover } from '@/components/volume-popover'
import { RenderFeatureHighlightsSection } from '@/components/render-feature-highlights-section'

let interval: any = null

const HomePage = () => {
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [mirrored, setMirrored] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [autoRecordEnable, setAutoRecordEnable] = useState(false)
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState<cocossd.ObjectDetection>()

  const initModel = async () => {
    const loadedModel: cocossd.ObjectDetection = await cocossd.load({
      base: 'mobilenet_v2',
    })
    setModel(loadedModel)
  }

  const runPrediction = async () => {
    if (
      model &&
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const predictions = await model.detect(webcamRef.current.video)

      resizeCanvas(canvasRef, webcamRef)
      drawOnCanvas(mirrored, predictions, canvasRef.current?.getContext('2d'))
    }
  }

  useEffect(() => {
    setLoading(true)
    initModel()
  }, [])

  useEffect(() => {
    if (model) {
      setLoading(false)
    }
  }, [model])

  useEffect(() => {
    interval = setInterval(() => {
      runPrediction()
    }, 100)

    return () => clearInterval(interval)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamRef.current, model, mirrored])

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

        <div className="h-full flex-1 overflow-y-scroll px-2 py-4">
          <RenderFeatureHighlightsSection
            isRecording={isRecording}
            autoRecordEnable={autoRecordEnable}
            setMirrored={setMirrored}
            usePromptRecord={usePromptRecord}
            usePromptScreenshot={usePromptScreenshot}
            toggleAutoRecord={toggleAutoRecord}
          />
        </div>
      </div>

      {loading && (
        <div className="absolute z-50 flex h-full w-full items-center justify-center bg-primary-foreground">
          Getting things ready . . . <Rings color="red" height={50} />
        </div>
      )}
    </div>
  )
}

export default HomePage
