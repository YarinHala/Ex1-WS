var express         = require('express'),
    events          = require('events'),
    url             = require('url')/*not-needed*/,
    bodyParser      = require('body-Parser'),
    TWS             = require('./ws/twitterService'),
    app             = express(),
    port            = process.env.PORT || 3000;

/*TWS = Twitter Web Service*/
twitterService = new TWS();

app.set('ManageNewsInTwitter');

/* bodyParser for json encode*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/assets', express.static(`${__dirname}/public`));
/* Routs for Redirecting */
//app.use('/news',express.static(`${__dirname}/db`));
//app.use('/news_pick',express.static(`${__dirname}/db`));
//app.use('/news_date_pick',express.static(`${__dirname}/db`));


app.all('*', (req, res, next) => {
    console.log(`get.all *  middleware + ${req.path}`);
    next();
})


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}index.html`);
});


/****************************************************************/
app.get('/news',(req,res) =>{
    console.log('GET - /news');

    twitterService.getAllNews()
        .then(
            (data) => {
                if (!data.length) {
                    console.log('no data return');
                    res.status(404).json('no db is abvileble');

                } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'getAllNews');
                    res.status(200).json(data);
                }
            }, (error) => {
                console.log(error);
            });
});

/****************************************************************/
app.post('/news_pick',(req,res) =>{
    console.log('POST - /news_pick');
    var _newsID = req.body.newsID;

    twitterService.getNewsByID(_newsID)
      .then(
          (data) => {
              if (!data.length) {
                  console.log('no data return');
                  res.status(404).json('no news exist');
              } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'getNewsByID');
                    res.status(200).json(data);
              }
          }, (error) => {
              console.log(error);
          });
});
/****************************************************************/
app.get('/news_date_pick/:newsID/:dateT',(req,res) =>{
    console.log('GET - /news_date_pick');
    var _newsID = req.params.newsID;
    var _dateT  = req.params.dateT;

    twitterService.getNewsByDate(_newsID , _dateT)
      .then(
          (data) => {
              if (!data.length) {
                  console.log('no data return');
                  res.status(404).json('news or date is false');
              } else {
                    res.set('Content-Type', 'application/json');
                    res.set('header-One' , 'getNewsByIDandDate');
                    res.status(200);
                    res.json(data);
              }
          }, (error) => {
              console.log(error);
          });
});
/****************************************************************/




//app.all('*',(req,res) =>{
//    res.send('Got lost? This is a friendly 404 page :) :)');
//});


app.listen(port,()=>{console.log(`listen on port ${port}`);});

