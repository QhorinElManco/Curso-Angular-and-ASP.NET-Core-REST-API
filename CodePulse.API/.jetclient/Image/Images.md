```toml
name = 'Images'
method = 'POST'
url = '{{baseUrl}}/api/image'
sortWeight = 1000000
id = 'ffac8268-5f33-42c9-af4d-80fbfd4f486b'

[[body.formData]]
type = 'FILE'
key = 'file'
value = '/home/mpineda/Descargas/wp9556617.jpg'

[[body.formData]]
key = 'title'
value = 'Honda EF'

[[body.formData]]
key = 'filename'
value = 'Honda EF dibujado'
```
