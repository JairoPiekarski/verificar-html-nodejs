import chalk from "chalk";
import fs, { readdir } from 'fs';
import getFile from "./index.js";
import validatedList from "./http-validator.js";

const path = process.argv;

async function printList(validator, result, path){
    if (validator){
        console.log(chalk.bgYellow(`Lista validada de links do arquivo ${path} : \n`), await validatedList(result));
    } else {
        console.log(chalk.bgYellow(`Lista de links do arquivo ${path} : \n`), result);        
    }
}

async function processText(argument){
    const path = argument[2];
    const validator = argument[3] === '--valida';

    try {
        fs.lstatSync(path);
    } catch (error) {
        if (error.code === 'ENOENT'){
            console.log(chalk.red('Arquivo ou diretório não existe'))
            return;
        }
    }

    if (fs.lstatSync(path).isFile()){
        const result = await getFile(path);
        printList(validator, result, path);
    }
    else if (fs.lstatSync(path).isDirectory()){
        const files = await fs.promises.readdir(path);
        files.forEach(async (fileName) => {
            const lista = await getFile(`${path}/${fileName}`);
            console.log(printList(validator, lista, fileName))
        })
    }

}

processText(path);