import * as fs from 'fs';
import * as path from 'path';

export function saveBlob(filename:string, blob:Buffer){
    const folder = path.parse(filename).dir;
    const name = path.parse(filename).base;
    
    try {
        fs.mkdirSync(folder, {recursive:true});
    } catch (error) {
      console.error(error);
    } 

    fs.writeFileSync(path.resolve(folder, `./${name}`), blob)
}