/*

    #TODO: contain all thr routes for /auth and handle the requests
    
*/
const express = require('express')
const router = express.Router()

router.post('/', (req,res) =>{
    /*

    #TODO: handle:
            const response = await axios.post(LOGIN_URL,
                    JSON.stringify({ user, pwd }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                console.log(JSON.stringify(response?.data));
                //console.log(JSON.stringify(response));
                const accessToken = response?.data?.accessToken;
                const roles = response?.data?.roles;
                setAuth({ user, pwd, roles, accessToken });
                setUser('');
                setPwd('');
                setSuccess(true);
    */
})

module.exports = router