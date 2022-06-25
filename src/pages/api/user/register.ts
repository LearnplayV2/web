import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req : NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST' && passwordAccess(req)) {
    return res.status(405).send('ola.');
        
    }

    return res.status(405).send('Nao permitido.');
}

const passwordAccess = (req: NextApiRequest) => req.query.password === process.env.API_PASSWORD;