'use client'

import { Volume2 } from 'lucide-react'
import { useState } from 'react'

import { beep } from '@/lib/audio'

import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Slider } from './ui/slider'

export const VolumePopover = () => {
  const [volume, setVolume] = useState(0.8)

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
