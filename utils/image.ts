import { Area } from "react-easy-crop/types"

export const createImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', (error) => reject(error))
        image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
        image.src = url
    })


export const getOutput = async (imgURL: string, cropInfo: Area) => {

    const image = await createImage(imgURL);
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return null
    }

    const pixelCrop = cropInfo;
    const bBoxWidth = image.width;
    const bBoxHeight = image.height;

    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.drawImage(image, 0, 0)

    const data = ctx.getImageData(
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height
    )

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    // paste generated image at the top left corner
    ctx.putImageData(data, 0, 0)

    // As a blob
    return new Promise<Blob>((resolve) => {
        canvas.toBlob((file) => {
            resolve(file!)
        }, 'image/jpeg')
    })

}