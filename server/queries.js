 const { Pool } = require('pg');

    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: ' videosproject_kawa_cyf',
        password: 'Rahand_2005',
        port: 5432
      });
      
      
      const videosData = (request, response) => {
        pool.query('SELECT * FROM videodetials ORDER BY rating', (error, results) => {
          if (error) {
            throw error
            console.log("response")
          }
          response.status(200).json(results.rows)
          console.log(response)
        })
      }    
module.exports = {
    videosData}