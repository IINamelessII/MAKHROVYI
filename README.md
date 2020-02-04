# AnotherOneProject

## General infomation [here](./INFO.md)

#TODO: Add responses (with body and codes) to examples

## API Endpoints Reference

- Endpoints accept `OPTIONS` HTTP requests.
- Endpoints accept `HEAD` HTTP requests if accept `GET` HTTP requests. #TODO: rewrite
- Endpoints use JSON objects as arguments for `POST`, `PUT`, and `PATCH` requests.
- Endpoints return JSON objects as response. If response does not provide content, it comes with `204 No Content` status code.

### Authentication

User authentication endpoints.

#### Sign Up

Sign Up new user.

`/api/auth/signup/`

Accepted HTTP methods: `POST`

Example:

```JSON
>>> POST /api/auth/signup/
>>> {'username':'johndoe123','password':'password', 'email':'john.doe@example.com'}
```

#### Sign In

Sign In existing user.

`/api/auth/signin/`

Accepted HTTP methods: `POST`

```JSON
>>> POST /api/auth/signin/
>>> {'username':'username','password':'password'}
```

### Proposals

Proposals related endpoints.

#### List proposals

List proposals with given parameters.

`/api/proposals/`

Accepted HTTP methods: `GET`

Arguments:

- limit: number of rows to return
- offset: number of rows to skip
- order: list of fields to order by
- status: status of proposals
- category: category of proposals
- name: name of proposals, supports wildcards

#TODO add more examples

```JSON
>>> GET /api/proposals/?status=active&limit=20&offset=40
```

#### Create new proposal

Create new rent proposal.

`/api/proposals/`

Accepted HTTP methods: `POST`

#TODO fields
```JSON
>>> POST /api/proposals/
>>> {fields: values}
```

### Users

`/api/users/`

List existing users.

### Requests

`/api/requests/`

List active requests.

### Queues

`/api/queues/`

List queues for active rent proposals.
