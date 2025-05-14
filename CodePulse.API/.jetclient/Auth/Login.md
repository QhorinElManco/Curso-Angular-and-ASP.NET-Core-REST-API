```toml
name = 'Login'
method = 'POST'
url = '{{baseUrl}}/api/auth/login'
sortWeight = 2000000
id = '70459a75-f303-4b8f-8bc3-43da411014e2'

[body]
type = 'JSON'
raw = '''
{
  "email": "sbethuell@gmail.com",
  "password": "sbethuell"
}'''
```

#### Post-response Script

```js
if (jc.response.status !== "200") {
    let data = jc.response.json();
    
    if (data.token !== undefined && data.token !== null && data.token !== "") {
        jc.globals.set("token", data.token)
    }
    else {
        jc.globals.set("token", "no.token")
    }
}


```
