'use strict';
exports.lambdaHandler = async (event) => {
    
    // Extract the request from the CloudFront event that is sent to Lambda@Edge 
    const request = event.Records[0].cf.request;

    // Extract the URI from the request
    const olduri = request.uri;

    // Match any '/' that occurs at the end of a URI. Replace it with a default index
    const newuri = olduri.replace(/\/$/, '\/index.html');
    
    // Replace the received URI with the URI that includes the index page
    request.uri = newuri;
    
    // Return to CloudFront
    return request;
};
