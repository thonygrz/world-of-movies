import app from '../src/app/server'

app.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}`))