import server from './server';

const port = parseInt(process.env.PORT || '4000');

const starter = new server().start(port)
  .then(port => console.log(`App listening on the port ${port}`))
  .catch(error => {
    console.log(error)
  });

export default starter;