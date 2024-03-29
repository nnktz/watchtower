'use client'

import { Volume2 } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { beep } from '@/lib/audio'

import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Slider } from './ui/slider'

interface VolumePopoverProps {
  volume: number
  setVolume: Dispatch<SetStateAction<number>>
}

export const VolumePopover = ({ volume, setVolume }: VolumePopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <Volume2 />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Slider
          max={1}
          min={0}
          step={0.2}
          defaultValue={[volume]}
          onValueCommit={(val) => {
            setVolume(val[0])
            beep(val[0])
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
