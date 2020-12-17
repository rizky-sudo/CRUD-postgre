var express = require('express');
const { route } = require('./users');
var router = express.Router();

/* GET users listing. */
module.exports = function (pool) {

  router.get('/', function (req, res, next) {
    pool.query(`SELECT * FROM tab`, (err, resp) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan silahkan coba lagi nanti" });
      res.json(resp.rows)
    })
  });


  // menampilkan add

  router.get('/add', function (req, res, next) {
    res.render('add');
  });
  router.post('/', function (req, res, next) {
    pool.query('INSERT INTO tab ( string, integer, float, date, boolean) VALUES ($1, $2, $3, $4, $5)', [req.body.string, Number(req.body.integer), Number(req.body.float), req.body.date, req.body.boolean], (err, resp) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan di router.post" });
      res.redirect('/')
    })
  });


  // menampilkan edit
  router.get('/edit/:id', function (req, res, next) {
    pool.query('SELECT * FROM tab WHERE id=$1', [Number(req.params.id)], (err, item) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan di router.get " });
      res.render('edit', { item: item.rows[0] })
    })
  });

  router.post('/edit/:id', function (req, res, next) {
    pool.query('UPDATE tab SET string=$1, integer=$2, float=$3, date=$4, boolean=$5 WHERE id=$6', [req.body.string, Number(req.body.integer), Number(req.body.float), req.body.date, req.body.boolean, Number(req.params.id)], (err, resp) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan di router.put" });
      res.redirect('/')
    })
  });

  // menampilkan delete
  router.delete('/:id', function (req, res, next) {
    pool.query('DELETE FROM tab  WHERE id=$1', [Number(req.params.id)], (err, resp) => {
      if (err) return res.status(500).json({ message: "terjadi kesalahan silahkan coba lagi nanti" });
      res.json(resp.rows)
    })
  });
  return router;
} 