import { FaceDetection, Box, Rect, WithFaceLandmarks } from '@vladmandic/face-api';
import { Canvas } from 'canvas';

export function theBestFace(dets: FaceDetection[]){
    const newlist = dets.filter(el=>el.box.area>80*80)
    if (newlist.length === 0) {
        return;
    }
    return newlist.reduce((mx, cur)=>{
        if (cur.score > mx.score) {
            mx = cur;
        }
        return mx;
    })
}

export function theBestFaceWithLandmarks(dets: WithFaceLandmarks<{detection:FaceDetection}>[]){
    const best = theBestFace(dets.map(el=>el.detection));
    if (!best) {
        return;
    }
    return dets.find(el=>el.detection === best);
}

export function rotateCanvas(source: Canvas, angle:number){
    const target = new Canvas(source.width, source.height);
    const ctx = target.getContext('2d');
    const w = source.width;
    const h = source.height;
    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(w / 2, h / 2)
    ctx.rotate(angle)
    ctx.translate(-w / 2, -h / 2)
    
    ctx.drawImage(source, 0, 0);
    ctx.restore();
    // ctx.drawImage(data, 0, 0)
    return target;

}

/**
 * 
 * @param box detect box
 * @param scale 
 * @param size height, width
 */
export function postprecessBox(box:Box, scale: number, [height, width]:[number, number]){
    // scale
    const c_x = (box.x + box.x + box.width) / 2;
    const c_y = (box.y + box.y + box.height) / 2;
    let new_x = Math.round(c_x - box.width * scale / 2);
    let new_y = Math.round(c_y - box.height * scale / 2);
    let new_w = Math.round(box.width * scale);
    let new_h = Math.round(box.height * scale);

    // padding if size is less than target
    if (new_h < height){
        new_y = Math.round(c_y - height / 2);
        new_h = Math.round(height);
    }
    if (new_w < width){
        new_x = Math.round(c_x - width / 2);
        new_w = Math.round(width);
    }

    return new Box(new Rect(new_x, new_y, new_w, new_h));
}