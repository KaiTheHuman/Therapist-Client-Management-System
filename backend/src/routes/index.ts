import { Router, Request, Response } from 'express'; //import Router which helps us create routes, as well as the other two

const router = Router(); //creates Router

router.get('/', (req: Request, res: Response) => { //on blank page,  send below message
    res.send('Hello from the home route!');
});

export default router;// export default router