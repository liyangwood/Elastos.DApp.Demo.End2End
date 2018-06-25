import Base from './Base';

export default class extends Base {
    
    // login with DID
    requestLogin(uuid: string): any{
        // TODO 
        
        return {
            profile : {
                name : 'jacky.li'
            }
        };
    }

    // verify the DID
    requestVerify(uuid: string): any{
        // TODO

        return {
            role : 'user',
            permisson : 'all'
        };
    }

    
    
}