'use client'

import { Dispatch, SetStateAction } from 'react'
import { Camera, FlipHorizontal, Moon, PersonStanding, Sun, Video } from 'lucide-react'
import { Rings } from 'react-loader-spinner'

import { Button } from './ui/button'
import { Separator } from './ui/separator'

interface IProps {
  setMirrored: Dispatch<SetStateAction<boolean>>
  usePromptScreenshot: () => void
  usePromptRecord: () => void
  toggleAutoRecord: () => void
  isRecording: boolean
  autoRecordEnable: boolean
}

export const RenderFeatureHighlightsSection = ({
  setMirrored,
  usePromptRecord,
  usePromptScreenshot,
  toggleAutoRecord,
  isRecording,
  autoRecordEnable,
}: IProps) => {
  return (
    <div className="text-xs text-muted-foreground">
      <ul className="space-y-4">
        <li>
          <strong>Dark Mode/Sys Theme 🌓</strong>
          <p>Toggle between dark mode and system theme.</p>
          <Button variant={'outline'} size={'icon'} className="my-2 h-6 w-6">
            <Sun size={14} />
          </Button>{' '}
          /{' '}
          <Button variant={'outline'} size={'icon'} className="my-2 h-6 w-6">
            <Moon size={14} />
          </Button>
        </li>

        <li>
          <strong>Horizontal Flip ↔</strong>
          <p>Adjust horizontal orientation</p>

          <Button
            variant={'outline'}
            size={'icon'}
            className="my-2 h-6 w-6"
            onClick={() => setMirrored((prev) => !prev)}
          >
            <FlipHorizontal size={14} />
          </Button>
        </li>

        <Separator />

        <li>
          <strong>Take Pictures 📸</strong>
          <p>Capture snapshots at my moment from the video feed.</p>

          <Button
            variant={'outline'}
            size={'icon'}
            className="my-2 h-6 w-6"
            onClick={usePromptScreenshot}
          >
            <Camera size={14} />
          </Button>
        </li>

        <li>
          <strong>Manual Video Recoding 🎥</strong>
          <p>Manually recode video clips as needed.</p>

          <Button
            variant={isRecording ? 'destructive' : 'outline'}
            size={'icon'}
            className="my-2 h-6 w-6"
            onClick={usePromptRecord}
          >
            <Video size={14} />
          </Button>
        </li>

        <Separator />

        <li>
          <strong>Enable/Disable Auto Record 🚫</strong>
          <p>Option to enable/disable automatic video recording whenever required.</p>

          <Button
            variant={autoRecordEnable ? 'destructive' : 'outline'}
            size={'icon'}
            className="my-2 h-6 w-6"
            onClick={toggleAutoRecord}
          >
            {autoRecordEnable ? <Rings color="white" height={30} /> : <PersonStanding size={14} />}
          </Button>
        </li>

        <li>
          <strong>Volume Slider 🔊</strong>
          <p>Adjust the volume level of the notifications.</p>
        </li>

        <li>
          <strong>Camera Feed Highlighting 🎨</strong>
          <p>
            Highlights persons in <span className="text-[#FF0F0F]">red</span> and other objects in{' '}
            <span className="text-[#00B612]">green</span>.
          </p>
        </li>

        <Separator />

        <li className="space-y-4">
          <strong>Share your thoughts 💭</strong>
          <br />
          <br />
          <br />
        </li>
      </ul>
    </div>
  )
}
