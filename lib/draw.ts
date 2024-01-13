import * as cocossd from '@tensorflow-models/coco-ssd'

export const drawOnCanvas = (
  mirrored: boolean,
  predictions: cocossd.DetectedObject[],
  arg2: CanvasRenderingContext2D | null | undefined,
) => {
  predictions.forEach((detectedObject: cocossd.DetectedObject) => {
    const { class: name, bbox, score } = detectedObject
    const [x, y, width, height] = bbox

    if (arg2) {
      arg2.beginPath()

      // styling
      arg2.fillStyle = name === 'person' ? '#FF0F0F' : '00B612'
      arg2.globalAlpha = 0.4

      mirrored
        ? arg2.roundRect(arg2.canvas.width - x, y, -width, height)
        : arg2.roundRect(x, y, width, height, 8)

      // draw stroke or fill
      arg2.fill()

      // text styling
      arg2.font = '12px Courier New'
      arg2.fillStyle = 'black'
      arg2.globalAlpha = 1

      mirrored
        ? arg2.fillText(name, arg2.canvas.width - x - width + 10, y + 20)
        : arg2.fillText(name, x + 10, y + 20)
    }
  })
}
