import fs from 'fs';
import chalk from 'chalk';

function extractLinks (text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...text.matchAll(regex)];
    const result = capturas.map(captura => ({[captura[1]] : captura[2]}));
    return result.length !== 0 ? result : 'Não há links no arquivo';
}

function handleError(error) {
    throw new Error(chalk.red(error.code, 'Não há arquivo no diretorio'));
}

async function getFile(filePath){
    try {
        const encoding = 'utf-8';
        const text = await fs.promises.readFile(filePath ,encoding);
        return extractLinks(text);
    } 
    catch (error) {
        handleError(error)
    } 
    finally {
        console.log(chalk.cyan('Finalizado'))
    }
}

export default getFile;