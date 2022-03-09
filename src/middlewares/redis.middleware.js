import { client } from "../config/redis"
import HttpStatus from 'http-status-codes';

export const checkGetAllNote = async (req, res, next) => {
   
    const data = await client.get('getAllNote');
    if(data==null){
        next();
    } else {
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: JSON.parse(data),
            message: 'Notes fetched successfully from Redis'
        });
    }
}