function extractLinks(arrLinks){
    return arrLinks.map((linkObject) => Object.values(linkObject).join())
}

async function statusChecker(arrLinks){
    const arrStatus = await Promise
    .all(
        arrLinks.map(async (url) => {
            try {
                const res = await fetch(url);
                return res.status;
            } catch (error){
                return handlingError(error);
            }
        })
    )
    return arrStatus;
}

function handlingError(error){
    if(error.cause.code === 'ENOTFOUND'){
        return 'Link não encontrado!'
    } else {
        return 'Ocorreu algum erro!'
    }
}

export default async function validatedList(linksList){
    const links = extractLinks(linksList);
    const status = await statusChecker(links);
    
    return linksList.map((object, position) => ({
        ...object,
        status: status[position]
    }))
}