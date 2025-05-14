```toml
name = 'Register'
method = 'POST'
url = '{{baseUrl}}/api/auth/register'
sortWeight = 1000000
id = '95a02bb3-8315-456d-b821-542547126a2e'

[body]
type = 'JSON'
raw = '''
{
  "email": "sbethuell@gmail.com",
  "password": "sbethuell"
}'''
```
