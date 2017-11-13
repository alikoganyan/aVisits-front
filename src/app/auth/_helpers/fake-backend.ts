import {
    BaseRequestOptions,
    Http,
    RequestMethod,
    RequestOptions,
    Response,
    ResponseOptions,
    XHRBackend
} from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";

let testSalons = [
    {
        address: "Красная площадь",
        chain_id: 0,
        city: "Москва",
        country: "Россия",
        created_at: "2017-11-11 13:25:22",
        current_time: "2017-11-11 13:25:22",
        id: 0,
        img: "/images/DNdNVHng3BkB902m.png",
        latitude: "42.54352350",
        longitude: "1.52331450",
        street_number: null,
        title: "salon 1",
        updated_at: "2017-11-11 13:25:22",
        user_id: 32
    },
    {
        address: null,
        chain_id: 0,
        city: "Москва",
        country: "Россия",
        created_at: "2017-11-12 11:46:43",
        current_time: "2017-11-12 11:46:43",
        id: 1,
        img: "/images/gnL0zz0IOksJz5VJ.png",
        latitude: "55.75582600",
        longitude: "37.61729990",
        street_number: null,
        title: "salon 2",
        updated_at: "2017-11-12 11:46:43",
        user_id: 32
    }
];

let testChains = [
    {
        "id": 0,
        "title": "chain title",
        description: "descr",
        "phone_number": null,
        "created_at": "2017-10-25 11:16:52",
        "updated_at": "2017-10-25 11:16:52",
        "levels": [
            {
                "id": 0,
                "level": "level 1",
                "chain_id": 0,
                "created_at": "2017-10-25 11:49:08",
                "updated_at": "2017-10-25 11:49:08"
            }
        ],
        "salons": testSalons,
        "salonsCount": testSalons.length
    },
    {
        "id": 3,
        "title": "chain title 2",
        description: "descr",
        "phone_number": "xxx",
        "created_at": "2017-10-25 11:16:52",
        "updated_at": "2017-10-25 11:16:52",
        "levels": [
            {
                "id": 1,
                "level": "level 1",
                "chain_id": 1,
                "created_at": "2017-10-25 11:49:08",
                "updated_at": "2017-10-25 11:49:08"
            }
        ],
        "salons": [],
        "salonsCount": 0
    }
];

export function mockBackEndFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    let chains: any[] = JSON.parse(localStorage.getItem('chains')) || testChains;
    let salons: any[] = JSON.parse(localStorage.getItem('salons')) || testSalons;
    // fake token
    let token: string = 'fake-jwt-token';

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {


            if (connection.request.url.match(/\/api\/\d+\/salon/)) {
                mockSalonRequest(connection);
                return;
            }

            if (connection.request.url.includes('/api/chain') && connection.request.method === RequestMethod.Get) {
                mockGetChains(connection);
                return;
            }
            if (connection.request.url.includes('/api/chain') && connection.request.method === RequestMethod.Post) {
                mockCreateChain(connection);
                return;
            }
            if (connection.request.url.includes('/api/chain') && connection.request.method === RequestMethod.Put) {
                mockUpdateChain(connection);
                return;
            }

            if (connection.request.url.includes('/user/signin') && connection.request.method === RequestMethod.Post) {
                mockSignin(connection);
                return;
            }

            // authenticate
            if (connection.request.url.includes('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                mockAuthenticate(connection);
                return;
            }

            // get users
            if (connection.request.url.includes('/api/users') && connection.request.method === RequestMethod.Get) {
                mockGetUsers(connection);
                return;
            }

            // get user by id
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => {
                        return user.id === id;
                    });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // create user
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let newUser = JSON.parse(connection.request.getBody());

                // validation
                let duplicateUser = users.filter(user => {
                    return user.email === newUser.email;
                }).length;
                if (duplicateUser) {
                    return connection.mockError(new Error('Email "' + newUser.email + '" is already registered'));
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // delete user
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // token verify
            if (connection.request.url.endsWith('/api/verify') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security
                // is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: { status: 'ok' } })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // forgot password
            if (connection.request.url.endsWith('/api/forgot-password') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());

                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.email === params.email;
                });

                if (filteredUsers.length) {
                    // in real world, if email is valid, send email change password link
                    let user = filteredUsers[0];
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                } else {
                    // else return 400 bad request
                    connection.mockError(new Error('User with this email does not exist'));
                }

                return;
            }

            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 50);

    });

    let mockSignin = function(connection: MockConnection) {
        let params = JSON.parse(connection.request.getBody());

        // find if any user matches login credentials
        let filteredUsers = users.filter(user => {
            return user.email === params.email && user.password === params.password;
        });

        if (params.email === 'demo@demo.com') {
            filteredUsers[0] = {
                fullName: 'Demo',
                email: 'demo@demo.com'
            };
        }

        if (filteredUsers.length) {
            // if login details are valid return 200 OK with user details and fake jwt token
            let user = filteredUsers[0];
            connection.mockRespond(new Response(new ResponseOptions({
                status: 200,
                body: {
                    "user": {
                        "id": 0,
                        "name": "demo",
                        "email": "demo@demo.com",
                        "last_name": "string",
                        "father_name": "string",
                        "phone": "string",
                        "created_at": "2017-10-19T13:11:49.858Z",
                        "updated_at": "2017-10-19T13:11:49.858Z",
                        "chains": [
                            {
                                "id": 0,
                                "title": "chain 1",
                                "description": "string",
                                "user_id": 0,
                                "created_at": "string",
                                "updated_at": "string"
                            },
                            {
                                "id": 1,
                                "title": "chain 2",
                                "description": "string",
                                "user_id": 0,
                                "created_at": "string",
                                "updated_at": "string"
                            }
                        ]
                    }
                }
            })));
        } else {
            // else return 400 bad request
            connection.mockError(new Error('Email or password is incorrect'));
        }
    };

    let mockAuthenticate = function(connection: MockConnection) {
        // get parameters from post request
        let params = JSON.parse(connection.request.getBody());

        // find if any user matches login credentials
        let filteredUsers = users.filter(user => {
            return user.email === params.email && user.password === params.password;
        });

        // default account
        if (params.email === 'demo@demo.com' && params.password === 'demo') {
            filteredUsers[0] = {
                fullName: 'Demo',
                email: 'demo@demo.com',
                password: 'demo',
            };
        }

        if (filteredUsers.length) {
            // if login details are valid return 200 OK with user details and fake jwt token
            let user = filteredUsers[0];
            connection.mockRespond(new Response(new ResponseOptions({
                status: 200,
                body: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    token: token
                }
            })));
        } else {
            // else return 400 bad request
            connection.mockError(new Error('Email or password is incorrect'));
        }
    };

    let mockGetChains = function(connection: MockConnection) {
        // localStorage.setItem('chains', JSON.stringify(chains));
        // if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: { data: chains } })));
        // } else {
        //     // return 401 not authorised if token is null or invalid
        //     connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
        // }
    };

    let mockCreateChain = function(connection: MockConnection) {
        let newChain = JSON.parse(connection.request.getBody());

        newChain.id = chains.length + 1;
        chains.push(newChain);
        localStorage.setItem('chains', JSON.stringify(chains));

        // respond 200 OK
        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
    };

    let mockUpdateChain = function(connection: MockConnection) {
        let chain = JSON.parse(connection.request.getBody());

        for (let i = 0; i < chains.length; i++) {
            if (chains[i].id === chain.id) {
                chains[i] = chain;
                break;
            }
        }

        localStorage.setItem('chains', JSON.stringify(chains));
        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
    };

    let mockGetUsers = function(connection: MockConnection) {
        // check for fake auth token in header and return users if valid, this security
        // is implemented server side in a real application
        if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
        } else {
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
        }
    };

    let mockSalonRequest = function(connection: MockConnection) {
        if (connection.request.method === RequestMethod.Get) {
            mockGetSalonRequest(connection);
        }
        else if (connection.request.method === RequestMethod.Post) {
            mockCreateSalon(connection);
        }
        else if (connection.request.method === RequestMethod.Delete) {
            mockDeleteSalon(connection);
        }
    };

    let mockGetSalonRequest = function(connection: MockConnection) {
        if (connection.request.url.match(/\/api\/\d+\/salon\/\d+/)) {
            mockGetSalon(connection);
        }
        else {
            mockGetSalons(connection);
        }
    };

    let mockGetSalon = function(connection: MockConnection) {
        let urlParts = connection.request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);
        let salon = testSalons.filter(s => s.id === id);

        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: { data: salon } })));
    };

    let mockGetSalons = function(connection: MockConnection) {
        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: { data: testSalons } })));
    };

    let mockCreateSalon = function(connection: MockConnection) {
        let newSalon = JSON.parse(connection.request.getBody());

        newSalon.id = salons.length + 1;
        salons.push(newSalon);
        localStorage.setItem('salons', JSON.stringify(salons));

        // respond 200 OK
        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
    };

    let mockDeleteSalon = function(connection: MockConnection) {
        let urlParts = connection.request.url.split('/');
        let id = parseInt(urlParts[urlParts.length - 1]);

        for (let i = 0; i < salons.length; i++) {
            if (salons[i].id === id) {
                salons.splice(i, 1);
                break;
            }
        }

        localStorage.setItem('salons', JSON.stringify(salons));

        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
    };

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    deps: [MockBackend, BaseRequestOptions, XHRBackend],
    useFactory: mockBackEndFactory
};