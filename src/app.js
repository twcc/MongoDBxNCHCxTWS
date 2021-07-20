import express from 'express';
import { MongoClient } from 'mongodb';
import compression from 'compression';
const app = express()
const port = 8080
const url =
    "mongodb://127.0.0.1:27017?retryWrites=true&writeConcern=majority";

function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

function isFloat(value) {
    return (!isNaN(value) && value.toString().indexOf('.') != -1)
}

function replacer(key, value) {

    // if is int, return int
    if (isInt(value)) {
        return parseInt(value);
    } else if (isFloat(value)) {
        return parseFloat(value);
    } else if (key == '_id') {
        return undefined;
    } else {
        return value;
    }
}
app.set('json replacer', replacer);

app.get(['/table2001/', '/table2001/:iso_code/'], (req, res) => {

    console.log(req.query.all);

    if (req.params.iso_code) {
        var iso_code = req.params.iso_code
        var query = { a02: iso_code };
    } else {
        var iso_code = "all"
        var query = {};
    }

    var need_all = (req.query.all && req.query.all == 'true')

    res.setHeader('Content-Type', 'application/json');
    const client = new MongoClient(url);
    client.connect((err) => {
        const db = client.db("test");
        const collection = db.collection('2001');

        if (need_all) {
            cursor = collection.find(query).sort({a03: -1});
        } else {
            if (iso_code == "all") {
                cursor = collection.find(query).sort({a02: 1, a03: -1});
            } else {
                cursor = collection.find(query).sort({ a03: -1 }).limit(1) // for MAX;
            }
        }

        cursor.toArray().then(function (docs) {
            console.log("docs for " + iso_code + " " + docs.length)

            if (req.query.download && req.query.download == 'true') {
                res.setHeader('Content-Disposition', 'attachment; filename=COVID19_TWCC_TWS_' + encodeURIComponent(iso_code) + '.json');
                res.setHeader('Content-type', 'application/json');
                res.write(JSON.stringify(docs, replacer, 4), function (err) {
                    res.end();
                });
            } else {
                res.type('application/json')
                res.json(docs);
            }
        }
        ).catch(function (error) {
            console.log(error)
        })
    });
});

app.get(['/table2002/', '/table2002/:iso_code/'], (req, res) => {

    console.log(req.query.all);

    if (req.params.iso_code) {
        var iso_code = req.params.iso_code
        var query = { a02: iso_code };
    } else {
        var iso_code = "all"
        var query = {};
    }

    var need_all = (req.query.all && req.query.all == 'true')

    res.setHeader('Content-Type', 'application/json');
    const client = new MongoClient(url);
    client.connect((err) => {
        const db = client.db("test");
        const collection = db.collection('2002');

        if (need_all) {
            cursor = collection.find(query).sort({a03: -1});
        } else {
            if (iso_code == "all") {
                cursor = collection.find(query).sort({a02: 1, a03: -1});
            } else {
                cursor = collection.find(query).sort({ a03: -1 }).limit(1) // for MAX;
            }
        }

        cursor.toArray().then(function (docs) {
            console.log("docs for " + iso_code + " " + docs.length)

            if (req.query.download && req.query.download == 'true') {
                res.setHeader('Content-Disposition', 'attachment; filename=COVID19_TWCC_TWS_' + iso_code + '.json');
                res.setHeader('Content-type', 'application/json');
                res.write(JSON.stringify(docs, replacer, 4), function (err) {
                    res.end();
                });
            } else {
                res.type('application/json')
                res.json(docs);
            }
        }
        ).catch(function (error) {
            console.log(error)
        })
    });
});

app.get('/', (req, res) => {
    res.status(200).send("{Service:'ok'}");
});

app.use(compression())
app.listen(port, '0.0.0.0', () => {
    console.log(`服務會運行在 http://{YOUR_VCS_IP}:${port}`)
})

