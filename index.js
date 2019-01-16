"use strict";
 
const axios = require('axios');

exports.handler = async (event) => {

    //assign webhook data to variable
    let webhookData = JSON.parse(event.body);
    
    //get endpoint url from advanced webhook 'endurl' property
    let url = event.headers.endurl;
    //exammple additional header passed with advanced webhook
    let myHeader = event.headers["x-api"];

         
    //deconstruct variables
   
   const {agent_expired, test_name, test_url, test_run_url, result, environment_name, region, region_name, requests, variables} = webhookData;
    
    let postData = webhookData;

    function postEndpoint(endpointUrl,postData,theHeader) {
        //axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['x-api'] = theHeader;
        return axios.post(endpointUrl,postData,theHeader);
    }

    if (!agent_expired) {
        try {
            let endPost = await postEndpoint(url,postData,myHeader);
            console.log(`Webhook Response Code: ${endPost.status}`);
        } catch(e) {
            console.warn(e);
        }
    } else {
        console.log(`Agent expired for Test run ${test_run_url}`);
        //define notification for when agent is expired
        
    }
        
        
    

    
};