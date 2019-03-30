import * as fs from "fs";

export async function Base64ToImage(folderPath: string, fileName: string, base64: string) {
    const isFolderExists = await fs.existsSync(folderPath);
    if (!isFolderExists) {
        await fs.mkdirSync(folderPath);
    }
    await fs.writeFileSync(`${folderPath}/${fileName}`, Buffer.from(base64, 'base64'));
    return Promise.resolve(`${folderPath}/${fileName}`);
}
