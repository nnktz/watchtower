import Webcam from 'react-webcam'
import { RefObject } from 'react'

export const resizeCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
  webcamRef: RefObject<Webcam>,
) => {
  const canvas = canvasRef.current
  const video = webcamRef.current?.video

  if (canvas && video) {
    const { videoHeight, videoWidth } = video
    canvas.width = videoWidth
    canvas.height = videoHeight
  }
}
