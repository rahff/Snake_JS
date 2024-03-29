export class MockRequest {

    constructor(body, params) {
        this.body = body;
        this.params = params;
    }

    setAuthentication(user){
        this.authentication = user;
    }
}


export class MockResponse {
    _status = 0;
    body;
    terminated = false;
    constructor() {}

    status(status){
        this._status = status;
        return this;
    }

    end(){
        this.terminated = true
    };

    json(json){
        this.body = json;
        this.terminated = true;
    }
    redirect(_){
        this._status = 302;
        this.terminated = true;
    }
}