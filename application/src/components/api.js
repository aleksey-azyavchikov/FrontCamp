export class ApiInvoker
{
    constructor() {
    }

    static getInstance() {
        if (this.storagapiInvokere === undefined || this.apiInvoker === null) {
            this.apiInvoker = new ApiInvoker();
        }  
        return this.apiInvoker;
    }
    

    getNewsApiUrl(apiKey) {
        return `https://newsapi.org/v1/articles?source=bbc-news&apiKey=${apiKey}`;
    }

    invoke(endpointUrl, init, succesHandler, errorHandler) {
        let url = endpointUrl;
        if(errorHandler === undefined || errorHandler === null) {
            errorHandler = function (error) { console.log("error"); console.log(error) } ;
        }
        if(succesHandler === undefined || succesHandler === null) {
            succesHandler = function (data) { console.log("success"); console.log(data) } ;
        }
        let request = new Request(url);

        fetch(request, init)
            .then(response => {
                switch(init.method) {
                    case "POST": return response;
                    case "GET" : return response.json();
                    case "DELETE" : return response.json();
                } 
            })
            .then(data => succesHandler(data))
            .catch(error => errorHandler(error))
    }

    static buildUrl(server, path) {
        return server + path;
    }
}